import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/Customer.entity';
import { Wallet } from 'src/entities/Wallet.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateWalletDto } from './dto/createWallet.dto';
import { DepositWalletDto } from './dto/depositWallet.dto';
import { WithDrawWalletDto } from './dto/withdrawWallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly dataSource: DataSource,
  ) {}

  async createWallet(data: CreateWalletDto) {
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const wallet = new Wallet();
    wallet.customer = customer;

    const dataReturn = await this.walletRepository.save(wallet);

    return { data: dataReturn };
  }

  async getWalletByCustomerId(customerId: number) {
    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    const wallet = await this.walletRepository.findOneBy({ customer });

    if (!wallet) {
      throw new HttpException('Wallet not found', HttpStatus.BAD_REQUEST);
    }

    return { data: wallet };
  }

  async depositWallet(data: DepositWalletDto) {
    const dataReturn = await this.walletRepository.update(
      { customerId: data.walletId },
      { balance: () => `balance + ${data.amount}` },
    );

    return { data: dataReturn };
  }

  async withdrawWallet(data: WithDrawWalletDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    let status = 'success';

    try {
      const wallet = await this.walletRepository.findOneBy({
        customerId: data.walletId,
      });

      if (!wallet) {
        throw new Error('Wallet not found');
      }

      if (wallet.balance < data.amount) {
        throw new Error('Insufficient balance');
      }

      wallet.balance -= data.amount;
      await this.walletRepository.save(wallet);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      status = 'failed';
    } finally {
      await queryRunner.release();
    }

    return { data: { status } };
  }
}

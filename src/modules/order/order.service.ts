import {
  HttpException,
  HttpStatus,
  HttpVersionNotSupportedException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order.entity';
import { Product } from 'src/entities/Product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Customer } from 'src/entities/Customer.entity';
import { WalletService } from '../wallet/wallet.service';
import { Wallet } from 'src/entities/Wallet.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly dataSource: DataSource,
    private readonly walletService: WalletService,
  ) {}

  async createOrder(data: CreateOrderDto) {
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    const queryRunner = this.dataSource.createQueryRunner();

    let product: Product = null;

    let isTransactionSuccess = true;

    await queryRunner.startTransaction();
    try {
      // check if product is enough
      product = await this.productRepository.findOneBy({
        id: data.productId,
      });
      if (product.totalRemaining < data.quantity) {
        throw new Error('Product not enough');
      }

      // check if customer's balance is enough
      const price = product.price * data.quantity;
      const wallet = await this.walletRepository.findOneBy({
        customerId: data.customerId,
      });
      if (wallet.balance < price) {
        throw Error("Customer's balance is not enough");
      }

      product.totalRemaining -= data.quantity;
      wallet.balance -= price;

      await this.productRepository.save(product);
      await this.walletRepository.save(wallet);

      // create new order
      const order = new Order();
      order.customer = customer;
      order.product = product;
      order.quantity = data.quantity;
      await this.orderRepository.save(order);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      isTransactionSuccess = false;
    } finally {
      await queryRunner.release();
    }

    if (!isTransactionSuccess) {
      return { message: 'Transaction Fail' };
    }

    return {
      message: 'Transaction Success',
    };
  }

  async getListOrdersByCustomerId(customerId: number) {
    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });

    const orders = await this.orderRepository.findBy({ customer });

    return { data: orders };
  }
}

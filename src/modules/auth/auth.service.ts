import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/Customer.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { LoginDto } from './dto/login.dto';
import { WalletService } from '../wallet/wallet.service';
import { Request } from 'express';
import { AuthRequest } from 'src/shared/AuthRequest';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private readonly walletService: WalletService,
  ) {}

  async signUp(data: SignUpDto) {
    const customerExisted = await this.customerRepository.findOneBy({
      username: data.username,
    });

    if (customerExisted) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customer = new Customer();
    customer.username = data.username;
    customer.hashedPassword = hashedPassword;

    const dataReturn = await this.customerRepository.save(customer);

    await this.walletService.createWalletForValidateCustomer(dataReturn);

    const token = jwt.sign(
      { id: dataReturn.id, username: data.username },
      process.env.JWT_SECRET,
    );

    return {
      data: {
        token,
      },
    };
  }

  async login(data: LoginDto) {
    const customer = await this.customerRepository.findOneBy({
      username: data.username,
    });

    if (!customer) {
      throw new HttpException('Username is incorrect', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      customer.hashedPassword,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign(
      { id: customer.id, username: data.username },
      process.env.JWT_SECRET,
    );

    return {
      data: {
        token,
      },
    };
  }

  async validateToken(request: AuthRequest) {
    const user = request.user;

    const customer = await this.customerRepository.findOneBy({
      id: user.id,
      username: user.username,
    });

    if (!customer) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

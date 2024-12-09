import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/Customer.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async signUp(data: SignUpDto) {
    const customerExisted = await this.customerRepository.findOneBy({
      username: data.username,
    });

    if (customerExisted) {
      return new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customer = new Customer();
    customer.username = data.username;
    customer.hashedPassword = hashedPassword;

    const token = jwt.sign({ username: data.username }, process.env.JWT_SECRET);

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
      return new HttpException('Username is incorrect', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      customer.hashedPassword,
    );

    if (!isPasswordMatch) {
      return new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign({ username: data.username }, process.env.JWT_SECRET);

    return {
      data: {
        token,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return {
        data: decoded,
      };
    } catch (error) {
      return new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/Customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(data: CreateCustomerDto) {
    const customer = new Customer();

    customer.id = data.id;

    const dataReturn = await this.customerRepository.save(customer);

    return { data: dataReturn };
  }
}

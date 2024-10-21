import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Custormer } from 'src/entities/Customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Custormer)
    private readonly customerRepository: Repository<Custormer>,
  ) {}

  async createCustomer(data: CreateCustomerDto) {
    const customer = new Custormer();
    customer.name = data.name;

    const dataReturn = await this.customerRepository.save(customer);

    return { data: dataReturn };
  }
}

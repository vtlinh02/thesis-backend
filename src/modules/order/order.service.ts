import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order.entity';
import { Product } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Custormer } from 'src/entities/Customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Custormer)
    private readonly customerRepository: Repository<Custormer>,
  ) {}

  async createOrder(data: CreateOrderDto) {
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    const product = await this.productRepository.findOneBy({
      id: data.productId,
    });

    const order = new Order();
    order.customer = customer;
    order.product = product;
    data.note ? (order.note = data.note) : null;

    const dataReturn = await this.orderRepository.save(order);
    return { data: dataReturn };
  }
}

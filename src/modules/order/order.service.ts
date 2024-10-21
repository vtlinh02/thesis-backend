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

    if (product.totalRemaining == 0) {
      return { message: 'Fail' };
    }

    product.totalRemaining = product.totalRemaining - 1;

    await this.productRepository.save(product);

    const order = new Order();
    order.customer = customer;
    order.product = product;
    data.note ? (order.note = data.note) : null;

    const dataReturn = await this.orderRepository.save(order);
    return {
      message: 'Success',
      data: dataReturn,
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

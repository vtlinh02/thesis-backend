import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order.entity';
import { Product } from 'src/entities/Product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Customer } from 'src/entities/Customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(data: CreateOrderDto) {
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    let product: Product = null;

    let isTransactionSuccess = false;

    queryRunner.startTransaction();
    try {
      product = await this.productRepository.findOneBy({
        id: data.productId,
      });

      if (product.totalRemaining == 0) {
        return { message: 'Fail' };
      }

      product.totalRemaining = product.totalRemaining - 1;

      await this.productRepository.save(product);

      await queryRunner.commitTransaction();
      isTransactionSuccess = true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (!isTransactionSuccess) {
      return { message: 'Transaction Fail' };
    }

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

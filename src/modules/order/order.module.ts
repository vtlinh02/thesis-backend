import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Custormer } from 'src/entities/Customer.entity';
import { Order } from 'src/entities/Order.entity';
import { Product } from 'src/entities/Product.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Custormer, Product])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

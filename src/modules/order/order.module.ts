import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/Customer.entity';
import { Order } from 'src/entities/Order.entity';
import { Product } from 'src/entities/Product.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { WalletModule } from '../wallet/wallet.module';
import { Wallet } from 'src/entities/Wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Customer, Product, Wallet]),
    WalletModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart.entity';
import { Customer } from 'src/entities/Customer.entity';
import { Product } from 'src/entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Customer, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

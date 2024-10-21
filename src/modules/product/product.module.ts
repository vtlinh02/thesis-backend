import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/Product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Shop } from 'src/entities/Shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Shop])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

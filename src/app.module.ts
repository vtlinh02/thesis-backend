import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/Shop.entity';
import { Custormer } from './entities/Customer.entity';
import { Product } from './entities/Product.entity';
import { Order } from './entities/Order.entity';
import { ShopModule } from './modules/shop/shop.module';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'vutuanlinh2002',
      database: 'thesis',
      entities: [Shop, Custormer, Product, Order],
      synchronize: true,
    }),
    ShopModule,
    ProductModule,
    CustomerModule,
    OrderModule,
  ],
})
export class AppModule {}

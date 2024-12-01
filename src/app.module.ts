import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/Shop.entity';
import { Customer } from './entities/Customer.entity';
import { Product } from './entities/Product.entity';
import { Order } from './entities/Order.entity';
import { ShopModule } from './modules/shop/shop.module';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { OrderModule } from './modules/order/order.module';
import { Cart } from './entities/Cart.entity';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'vutuanlinh2002',
      database: 'thesis',
      entities: [Shop, Customer, Product, Order, Cart],
      synchronize: true,
    }),
    ShopModule,
    ProductModule,
    CustomerModule,
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}

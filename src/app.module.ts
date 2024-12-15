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
import { Wallet } from './entities/Wallet.entity';
import { WalletModule } from './modules/wallet/wallet.module';
import { AuthModule } from './modules/auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Shop, Customer, Product, Order, Cart, Wallet],
      synchronize: true,
    }),
    AuthModule,
    ShopModule,
    ProductModule,
    CustomerModule,
    OrderModule,
    CartModule,
    WalletModule,
  ],
})
export class AppModule {}

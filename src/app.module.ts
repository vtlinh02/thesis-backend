import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rootCertificates } from 'tls';
import { Shop } from './entities/Shop.entity';
import { Custormer } from './entities/Customer.entity';
import { Product } from './entities/Product.entity';
import { CustomerProduct } from './entities/CustomerProduct.entity';
import { ShopModule } from './modules/shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'vutuanlinh2002',
      database: 'thesis',
      entities: [Shop, Custormer, Product, CustomerProduct],
      synchronize: true,
    }),
    ShopModule,
  ],
})
export class AppModule {}

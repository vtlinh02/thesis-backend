import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Custormer } from 'src/entities/Customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Custormer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Custormer } from './Customer.entity';
import { Product } from './Product.entity';

@Entity()
export class CustomerProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.customerProducts)
  product: Product;

  @ManyToOne(() => Custormer, (customer) => customer.customerProducts)
  customer: Custormer;

  @Column({
    nullable: true,
  })
  note?: string;
}

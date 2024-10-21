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
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ManyToOne(() => Custormer, (customer) => customer.orders)
  customer: Custormer;

  @Column({
    nullable: true,
  })
  note?: string;
}

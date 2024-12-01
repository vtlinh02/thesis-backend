import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer.entity';
import { Product } from './Product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Column({
    nullable: true,
  })
  note?: string;
}

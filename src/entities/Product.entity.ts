import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerProduct } from './CustomerProduct.entity';
import { Shop } from './Shop.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalRemaining: number;

  @OneToMany(
    () => CustomerProduct,
    (customerProduct) => customerProduct.product,
  )
  customerProducts: CustomerProduct[];

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;
}

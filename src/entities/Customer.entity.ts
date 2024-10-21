import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CustomerProduct } from './CustomerProduct.entity';

@Entity()
export class Custormer {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => CustomerProduct,
    (customerProduct) => customerProduct.customer,
  )
  customerProducts: CustomerProduct[];
}

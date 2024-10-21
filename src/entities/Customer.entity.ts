import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './Order.entity';

@Entity()
export class Custormer {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}

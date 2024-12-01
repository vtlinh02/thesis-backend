import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Cart } from './Cart.entity';

@Entity()
export class Customer {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.customer)
  carts: Cart[];
}

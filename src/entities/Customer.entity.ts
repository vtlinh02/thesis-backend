import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Cart } from './Cart.entity';
import { Wallet } from './Wallet.entity';

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

  @OneToOne(() => Wallet, (wallet) => wallet.customer)
  wallet: Wallet;
}

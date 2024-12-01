import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './Customer.entity';

@Entity()
export class Wallet {
  @PrimaryColumn()
  customerId: number;

  @Column()
  balance: number = 1000;

  @Column()
  currency: string = 'USD';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.wallet)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}

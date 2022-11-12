import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { SellerUser } from './sellerUser.entity';

@Entity()
export class Apartament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => SellerUser, (sellerUser) => sellerUser.apartaments)
  sellerUser: SellerUser;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: string;
}

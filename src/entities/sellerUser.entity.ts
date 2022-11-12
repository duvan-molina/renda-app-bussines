import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Apartament } from './apartament.entity';

@Entity()
export class SellerUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  DOB: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Apartament, (apartament) => apartament.sellerUser)
  apartaments: Apartament[];

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: string;
}

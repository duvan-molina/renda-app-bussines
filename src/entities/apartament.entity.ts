import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApartamentGallery } from './apartamentGallery.entity';
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

  @Column()
  price: number;

  @ManyToOne(() => SellerUser, (sellerUser) => sellerUser.apartaments)
  sellerUser: SellerUser;

  @OneToMany(
    () => ApartamentGallery,
    (apartamentGallery) => apartamentGallery.apartament,
  )
  apartamentGallery: ApartamentGallery[];

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: string;
}

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

  @Column()
  numberOfRooms: number;

  @Column()
  numberOfBathRooms: number;

  @Column()
  socialStratum: number;

  @Column({ default: true })
  pets: boolean;

  @Column()
  isReting: boolean;

  @Column({ default: false })
  furnished: boolean;

  @Column()
  includedServices: boolean;

  @Column()
  commercialUse: boolean;

  @Column({ default: false })
  withGarage: boolean;

  @Column({ default: false })
  motorcycleStorageSpace: boolean;

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

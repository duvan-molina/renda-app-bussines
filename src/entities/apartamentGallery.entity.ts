import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Apartament } from './apartament.entity';

@Entity()
export class ApartamentGallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Apartament, (apartament) => apartament.apartamentGallery)
  apartament: Apartament;

  @CreateDateColumn({ type: 'timestamp' })
  creation_date: string;
}

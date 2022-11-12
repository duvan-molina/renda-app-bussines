import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApartamentsService {
  constructor(
    @InjectRepository(Apartament)
    private apartamentsRepository: Repository<Apartament>,
  ) {}

  async getAllApartaments(): Promise<Apartament[] | []> {
    return await this.apartamentsRepository.find();
  }

  async getApartamentById(apartamentId: string): Promise<Apartament> {
    return await this.apartamentsRepository.findOneBy({
      id: apartamentId,
    });
  }
}

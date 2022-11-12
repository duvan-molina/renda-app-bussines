import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { IApartament } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Apartament)
    private apartamentsRepository: Repository<Apartament>,
  ) {}

  async createApartament(apartament: IApartament): Promise<string> {
    await this.apartamentsRepository
      .createQueryBuilder()
      .insert()
      .into(Apartament)
      .values(apartament)
      .execute();
    return 'The apartment was successfully added';
  }

  async findAllApartament(): Promise<IApartament[]> {
    return await this.apartamentsRepository.find();
  }

  async getApartamentById(apartamentId: string): Promise<IApartament> {
    return await this.apartamentsRepository.findOneBy({
      id: apartamentId,
    });
  }

  async deleteApartament(apartamentId: string): Promise<string> {
    await this.apartamentsRepository
      .createQueryBuilder()
      .delete()
      .from(Apartament)
      .where('id = :id', { id: apartamentId })
      .execute();
    return 'The apartament was successfully removing';
  }
}

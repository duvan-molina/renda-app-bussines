import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { IApartament } from 'src/interfaces';
import { Repository } from 'typeorm';
import { SellerUserService } from '../seller-user/seller-user.service';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Apartament)
    private apartamentsRepository: Repository<Apartament>,
    private sellerUserService: SellerUserService,
  ) {}

  async createApartament(
    apartament: IApartament & { sellerUserId: string },
  ): Promise<string> {
    const sellerUser = await this.sellerUserService.getSellerUser(
      apartament.sellerUserId,
    );

    await this.apartamentsRepository
      .createQueryBuilder()
      .insert()
      .into(Apartament)
      .values({
        ...apartament,
        sellerUser,
      })
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

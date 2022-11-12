import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerUser } from 'src/entities/sellerUser.entity';
import { ISellerUser } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class SellerUserService {
  constructor(
    @InjectRepository(SellerUser)
    private sellerUserRepository: Repository<SellerUser>,
  ) {}

  async createSellerUser(sellerUser: ISellerUser): Promise<string> {
    await this.sellerUserRepository
      .createQueryBuilder()
      .insert()
      .into(SellerUser)
      .values(sellerUser)
      .execute();
    return 'The seller user was successfully added';
  }

  async getSellerUser(sellerUserId: string): Promise<SellerUser> {
    return await this.sellerUserRepository.findOneBy({
      id: sellerUserId,
    });
  }

  async getSellerUserAndApartaments(sellerUserId: string): Promise<SellerUser> {
    return await this.sellerUserRepository.findOne({
      where: { id: sellerUserId },
      relations: ['apartaments'],
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerUser } from 'src/entities/sellerUser.entity';
import { ILoginSellerUser, ISellerUser } from 'src/interfaces';
import { decodePassword, encryptPassword, SECRET_KEY } from 'src/utils';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

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
      .values({
        ...sellerUser,
        password: await encryptPassword(sellerUser.password),
      })
      .execute();
    return 'The seller user was successfully added';
  }

  async loginSellerUser(loginSellerUser: ILoginSellerUser) {
    const sellerUserResponse = await this.sellerUserRepository
      .createQueryBuilder()
      .select('seller_user')
      .from(SellerUser, 'seller_user')
      .where('seller_user.email = :email', { email: loginSellerUser.email })
      .getOne();

    if (!sellerUserResponse) {
      return {
        success: false,
        errors: [{ path: '/login', message: 'The email does not exist' }],
      };
    }

    const isValidPassword = await decodePassword(
      loginSellerUser.password,
      sellerUserResponse.password,
    );

    if (!isValidPassword) {
      return {
        success: false,
        errors: [{ path: 'password', message: 'Password incorrect' }],
      };
    }

    const token = jwt.sign(
      { sellerUserId: sellerUserResponse.id },
      SECRET_KEY,
      {
        expiresIn: '1d',
      },
    );

    return {
      success: true,
      token,
    };
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

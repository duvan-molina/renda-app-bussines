import { Body, Controller, Post, Req } from '@nestjs/common';
import { ILoginSellerUser, ISellerUser } from 'src/interfaces';
import { SellerUserService } from './seller-user.service';
import { Request } from 'express';
import { SECRET_KEY } from 'src/utils';
import * as jwt from 'jsonwebtoken';

@Controller('api/v1/seller-user')
export class SellerUserController {
  constructor(private sellerUserService: SellerUserService) {}

  @Post('create-seller-user')
  createSellerUser(@Body() sellerUser: ISellerUser) {
    return this.sellerUserService.createSellerUser(sellerUser);
  }

  @Post('login')
  loginSellerUser(@Body() loaginSellerUser: ILoginSellerUser) {
    return this.sellerUserService.loginSellerUser(loaginSellerUser);
  }

  @Post('me')
  async getSellerUserAndApartaments(@Req() request: Request) {
    const token = request.headers['authorization'];
    const decode = await jwt.verify(token, SECRET_KEY);

    return this.sellerUserService.getSellerUserAndApartaments(
      decode.sellerUserId,
    );
  }
}

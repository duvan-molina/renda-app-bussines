import { Body, Controller, Post } from '@nestjs/common';
import { ISellerUser } from 'src/interfaces';
import { SellerUserService } from './seller-user.service';

@Controller('api/v1/seller-user')
export class SellerUserController {
  constructor(private sellerUserService: SellerUserService) {}

  @Post()
  createSellerUser(@Body() sellerUser: ISellerUser) {
    return this.sellerUserService.createSellerUser(sellerUser);
  }

  @Post('me')
  getSellerUserAndApartaments(@Body() sellerUserId: { sellerUserId: string }) {
    return this.sellerUserService.getSellerUserAndApartaments(
      sellerUserId.sellerUserId,
    );
  }
}

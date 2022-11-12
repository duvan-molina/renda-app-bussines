import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerUser } from 'src/entities/sellerUser.entity';
import { SellerUserController } from './seller-user.controller';
import { SellerUserService } from './seller-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellerUser])],
  controllers: [SellerUserController],
  providers: [SellerUserService],
})
export class SellerUserModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { SellerUser } from 'src/entities/sellerUser.entity';
import { SellerUserService } from '../seller-user/seller-user.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartament, SellerUser])],
  controllers: [DashboardController],
  providers: [DashboardService, SellerUserService],
})
export class DashboardModule {}

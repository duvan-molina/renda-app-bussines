import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { ApartamentGallery } from 'src/entities/apartamentGallery.entity';
import { SellerUser } from 'src/entities/sellerUser.entity';
import { LoginDashboardMiddleware } from 'src/middleware/loginDashboard.middleware';
import { SellerUserService } from '../seller-user/seller-user.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartament, SellerUser, ApartamentGallery]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, SellerUserService],
})
export class DashboardModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginDashboardMiddleware).forRoutes('api/v1/dashboard');
  }
}

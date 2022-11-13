import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerUser } from 'src/entities/sellerUser.entity';
import { LoginDashboardMiddleware } from 'src/middleware/loginDashboard.middleware';
import { SellerUserController } from './seller-user.controller';
import { SellerUserService } from './seller-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SellerUser])],
  controllers: [SellerUserController],
  providers: [SellerUserService],
})
export class SellerUserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginDashboardMiddleware)
      .exclude(
        {
          path: 'api/v1/seller-user/create-seller-user',
          method: RequestMethod.POST,
        },
        { path: 'api/v1/seller-user/login', method: RequestMethod.POST },
        { path: 'api/v1/seller-user/upload', method: RequestMethod.POST },
      )
      .forRoutes('api/v1/seller-user');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Apartament } from './entities/apartament.entity';
import { SellerUserModule } from './modules/seller-user/seller-user.module';
import { SellerUser } from './entities/sellerUser.entity';
import { ApartamentsModule } from './modules/apartaments/apartaments.module';
import { ApartamentGallery } from './entities/apartamentGallery.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      entities: [Apartament, SellerUser, ApartamentGallery],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DashboardModule,
    SellerUserModule,
    ApartamentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

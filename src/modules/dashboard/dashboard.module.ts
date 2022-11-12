import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartament])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

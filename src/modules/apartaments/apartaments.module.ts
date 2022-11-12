import { Module } from '@nestjs/common';
import { ApartamentsService } from './apartaments.service';
import { ApartamentsController } from './apartaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apartament])],
  controllers: [ApartamentsController],
  providers: [ApartamentsService],
})
export class ApartamentsModule {}

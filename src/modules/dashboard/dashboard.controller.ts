import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IApartament } from 'src/interfaces';
import { DashboardService } from './dashboard.service';

@Controller('api/v1/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('apartaments')
  findAllApartament() {
    return this.dashboardService.findAllApartament();
  }

  @Get('apartament/:apartamentId')
  getApartamentById(@Param('apartamentId') apartamentId: string) {
    return this.dashboardService.getApartamentById(apartamentId);
  }

  @Post('create-apartament')
  @UseInterceptors(FilesInterceptor('files'))
  createApartament(
    @Body() data: IApartament & { sellerUserId: string },
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.dashboardService.createApartament({
      ...data,
      files,
    });
  }

  @Delete()
  deleteApartament(@Body() apartamentId: { apartamentId: string }) {
    return this.dashboardService.deleteApartament(apartamentId.apartamentId);
  }
}

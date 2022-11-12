import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IApartament } from 'src/interfaces';
import { DashboardService } from './dashboard.service';

@Controller('api/v1/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  findAllApartament() {
    return this.dashboardService.findAllApartament();
  }

  @Get('apartament/:apartamentId')
  getApartamentById(@Param('apartamentId') apartamentId: string) {
    return this.dashboardService.getApartamentById(apartamentId);
  }

  @Post()
  createApartament(@Body() data: IApartament & { sellerUserId: string }) {
    return this.dashboardService.createApartament(data);
  }

  @Delete()
  deleteApartament(@Body() apartamentId: { apartamentId: string }) {
    return this.dashboardService.deleteApartament(apartamentId.apartamentId);
  }
}

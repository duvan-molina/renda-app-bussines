import { Controller, Get, Param } from '@nestjs/common';
import { ApartamentsService } from './apartaments.service';

@Controller('api/v1/apartaments')
export class ApartamentsController {
  constructor(private apartamentsService: ApartamentsService) {}

  @Get()
  getAllApartaments() {
    return this.apartamentsService.getAllApartaments();
  }

  @Get(':apartamentId')
  getApartamentById(@Param('apartamentId') apartamentId: string) {
    return this.apartamentsService.getApartamentById(apartamentId);
  }
}

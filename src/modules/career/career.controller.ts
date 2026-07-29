import { Controller, Get, Render } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get()
  @Render('career/index')
  getCareer() {
    return this.careerService.getPageData();
  }
}

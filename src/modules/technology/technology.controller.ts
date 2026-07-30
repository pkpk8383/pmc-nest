import { Controller, Get, Render } from '@nestjs/common';
import { TechnologyService } from './technology.service';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  @Render('technology/index')
  getTechnology() {
    return this.technologyService.getPageData();
  }
}

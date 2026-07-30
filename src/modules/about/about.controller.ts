import { Controller, Get, Render } from '@nestjs/common';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @Render('about/index')
  getAbout() {
    return this.aboutService.getPageData();
  }
}

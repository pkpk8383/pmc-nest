import { Controller, Get, Render } from '@nestjs/common';
import { ConsultingService } from './consulting.service';

@Controller('consulting')
export class ConsultingController {
  constructor(private readonly consultingService: ConsultingService) {}

  @Get()
  @Render('consulting/index')
  getConsulting() {
    return this.consultingService.getPageData();
  }
}

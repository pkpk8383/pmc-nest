import { Controller, Get, Render } from '@nestjs/common';
import { CapacityBuildingService } from './capacity-building.service';

@Controller('capacity-building')
export class CapacityBuildingController {
  constructor(private readonly capacityBuildingService: CapacityBuildingService) {}

  @Get()
  @Render('capacity-building/index')
  getCapacityBuilding() {
    return this.capacityBuildingService.getPageData();
  }
}

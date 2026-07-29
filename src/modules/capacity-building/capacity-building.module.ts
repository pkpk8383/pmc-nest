import { Module } from '@nestjs/common';
import { CapacityBuildingController } from './capacity-building.controller';
import { CapacityBuildingService } from './capacity-building.service';

@Module({
  controllers: [CapacityBuildingController],
  providers: [CapacityBuildingService],
})
export class CapacityBuildingModule {}

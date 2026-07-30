import { Injectable } from '@nestjs/common';

@Injectable()
export class CapacityBuildingService {
  getPageData() {
    return {
      title: 'Capacity Building & Training — Positive Mantra Consulting',
      description:
        "PMC's Capacity Building & Training builds skills, strengthens institutions, and empowers communities through outcome-driven interventions delivered with Central and State Governments.",
      layout: 'main',
      activeNav: 'services',
    };
  }
}

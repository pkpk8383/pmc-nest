import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsultingService {
  getPageData() {
    return {
      title: 'Strategic Consulting — Positive Mantra Consulting',
      description:
        "PMC's strategic consulting bridges the gap between policy and delivery, partnering with governments to translate intent into measurable outcomes for Viksit Bharat.",
      layout: 'layouts/main',
      activeNav: 'services',
    };
  }
}

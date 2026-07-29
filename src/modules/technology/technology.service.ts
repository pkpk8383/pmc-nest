import { Injectable } from '@nestjs/common';

@Injectable()
export class TechnologyService {
  getPageData() {
    return {
      title: 'Technology — Positive Mantra Consulting',
      description:
        'PMC builds AI-driven digital platforms, data intelligence, and technology solutions purpose-built for government and the scale of India.',
      layout: 'layouts/main',
      activeNav: 'services',
    };
  }
}

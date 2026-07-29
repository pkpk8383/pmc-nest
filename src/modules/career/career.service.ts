import { Injectable } from '@nestjs/common';

@Injectable()
export class CareerService {
  getPageData() {
    return {
      title: 'Career — Positive Mantra Consulting',
      description:
        'Build your career at Positive Mantra Consulting. Work on the systems that shape nations — partnering with governments to deliver programs that improve lives at scale.',
      layout: 'layouts/main',
      activeNav: 'career',
    };
  }
}

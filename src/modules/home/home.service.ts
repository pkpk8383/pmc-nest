import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  getPageData() {
    return {
      title: 'Positive Mantra Consulting — Positive Change. Real Impact.',
      description:
        'Positive Mantra Consulting partners with governments, institutions, communities and enterprises to turn national ambitions into lasting, measurable impact.',
      layout: 'main',
    };
  }
}

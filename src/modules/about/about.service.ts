import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutService {
  getPageData() {
    return {
      title: 'About Us — Positive Mantra Consulting',
      description:
        'Positive Mantra Consulting exists to enable positive change and real impact — partnering with government to build stronger institutions and empowered communities for Viksit Bharat.',
      layout: 'main',
      activeNav: 'about',
    };
  }
}

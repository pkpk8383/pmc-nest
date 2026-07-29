import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  getPageData() {
    return {
      title: 'Contact Us — Positive Mantra Consulting',
      description:
        'Contact Positive Mantra Consulting. Get in touch to learn how we work shoulder-to-shoulder with public sector leaders to reimagine government services and programs.',
      layout: 'layouts/main',
      activeNav: 'contact',
    };
  }
}

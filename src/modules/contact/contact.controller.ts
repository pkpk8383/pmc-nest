import { Controller, Get, Render } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @Render('contact/index')
  getContact() {
    return this.contactService.getPageData();
  }
}

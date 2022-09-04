import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('enquiry')
    enquiry(@Body() data) {
        return this.mailService.sendEnquiryEmail(data.email);
    }
}

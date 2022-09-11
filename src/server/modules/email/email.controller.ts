import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(updateEmailDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getConfig() {
    return this.emailService.getConfig();
  }
}

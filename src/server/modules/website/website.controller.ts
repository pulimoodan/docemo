import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { WebsiteService } from './website.service';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websiteService.update(updateWebsiteDto, id);
  }

  @Get()
  getConfig() {
    return this.websiteService.getConfig();
  }
}

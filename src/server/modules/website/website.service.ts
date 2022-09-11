import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateWebsiteDto } from './dto/update-website.dto';

@Injectable()
export class WebsiteService {
  constructor(private prisma: PrismaService) {}

  update(updateWebsiteDto: UpdateWebsiteDto, id: string) {
    return this.prisma.website.update({
      where: {
        id: Number(id),
      },
      data: updateWebsiteDto,
    });
  }

  getConfig() {
    return this.prisma.website.findFirst();
  }
}

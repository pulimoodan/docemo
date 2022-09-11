import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  getConfig() {
    return this.prisma.email.findFirst();
  }

  update(updateEmailDto: UpdateEmailDto, id: string) {
    return this.prisma.email.update({
      where: { id: Number(id) },
      data: updateEmailDto,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  update(updatePaymentDto: UpdatePaymentDto, id: string) {
    return this.prisma.payment.update({
      where: {
        id: Number(id),
      },
      data: updatePaymentDto,
    });
  }

  getConfig() {
    return this.prisma.payment.findFirst();
  }
}

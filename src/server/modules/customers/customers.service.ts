import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const exist = await this.prisma.customer.findUnique({
      where: { email: createCustomerDto.email },
    });
    if (exist) {
      return this.update(exist.id, createCustomerDto);
    }
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  findAll() {
    return this.prisma.customer.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
      include: {
        orders: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        orders: true,
      },
    });
    for (const i in user.orders) {
      await this.prisma.order.delete({ where: { id: user.orders[i].id } });
    }
    return this.prisma.customer.delete({ where: { id } });
  }
}

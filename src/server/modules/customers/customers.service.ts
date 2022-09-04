import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) { }

  async create(createCustomerDto: CreateCustomerDto) {
    const exist = await this.prisma.customer.findUnique({ where: { email: createCustomerDto.email } });
    if (exist) {
      return this.update(exist.id, createCustomerDto);
    }
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  findAll() {
    return this.prisma.customer.findMany();
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

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}

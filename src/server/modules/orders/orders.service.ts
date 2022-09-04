import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentResDto } from './dto/res-payment.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private mailService: MailService) { }

  async create(createOrderDto: CreateOrderDto) {
    let orderProducts = [];
    for (const i in createOrderDto.productsArray) {
      const orderProduct = await this.prisma.orderProduct.upsert({
        where: {
          productId_quantity: {
            productId: createOrderDto.productsArray[i].id,
            quantity: createOrderDto.productsArray[i].quantity
          }
        },
        update: {},
        create: {
          productId: createOrderDto.productsArray[i].id,
          quantity: createOrderDto.productsArray[i].quantity
        }
      });
      orderProducts.push(orderProduct);
    }
    return this.prisma.order.create({
      data: {
        products: { connect: orderProducts.map((item) => { return { id: item.id } }) },
        customer: { connect: { id: createOrderDto.customerId } },
        paid: createOrderDto.paid,
        paymentType: createOrderDto.paymentType,
        paymentCurrency: createOrderDto.paymentCurrency
      }
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }

  async paymentHook(payment: PaymentResDto) {
    if (payment.payment_status == "finished") {
      const order = await this.prisma.order.update({
        where: {
          id: Number(payment.order_id)
        },
        data: {
          paid: true,
          paymentId: String(payment.payment_id)
        },
        include: {
          products: true
        }
      });
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: Number(order.customerId)
        }
      });
      await this.mailService.sendConfirmationEmail(customer, order);
      return await this.mailService.sendEmailNotification(customer, order);
    }
  }

  async stripeCheckout(data) {
    const order = await this.prisma.order.update({
      where: {
        id: Number(data.orderId)
      },
      data: {
        paid: true,
        paymentId: String(data.token.id)
      },
      include: {
        products: true,
      }
    });
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: Number(order.customerId)
      }
    });
    await this.mailService.sendConfirmationEmail(customer, order);
    return await this.mailService.sendEmailNotification(customer, order);
  }
}

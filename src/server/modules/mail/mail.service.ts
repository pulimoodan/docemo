import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private productService: ProductsService,
  ) {}

  async sendConfirmationEmail(customer, order) {
    return await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Welcome to Windows Server Support! Confirm your purchase',
      html: await this.confirmationHTML(customer, order),
    });
  }

  async sendEmailNotification(customer, order) {
    return await this.mailerService.sendMail({
      to: process.env.MAIL_TO,
      subject: 'New order from windows server support',
      html: await this.notificationHTML(customer, order),
    });
  }

  async sendEnquiryEmail(email) {
    return await this.mailerService.sendMail({
      to: process.env.MAIL_TO,
      subject: 'New enquiry from windows server support',
      html: await this.enquiryHTML(email),
    });
  }

  confirmationHTML = async (customer, order) => {
    const products = [];

    for (const i in order.products) {
      const product = await this.productService.findOne(
        order.products[i].productId,
      );
      products.push({
        name: product.name,
        quantity: order.products[i].quantity,
      });
    }

    console.log(products);
    return `
            <p>Hey ${customer.firstName},</p>
            <p>We got your order and will get back to you soon with the product.</p>
            <p>Your order :</p>
            <ul>
                ${products.map(
                  (product) => `<li>${product.name} x ${product.quantity}</li>`,
                )}
            </ul>
            `;
  };

  notificationHTML = async (customer, order) => {
    const products = [];

    for (const i in order.products) {
      const product = await this.productService.findOne(
        order.products[i].productId,
      );
      products.push({
        name: product.name,
        quantity: order.products[i].quantity,
      });
    }
    return `
            <p>Hey admin,</p>
            <p>We got a new order from windows server sopport</p>
            <p>Order :</p>
            <ul>
                ${products.map(
                  (product) => `<li>${product.name} x ${product.quantity}</li>`,
                )}
            </ul>

            <p>Ordered by :</p>
            <p>${customer.firstName} ${customer.lastName}</p>
            <p>${customer.email}</p>
            `;
  };

  enquiryHTML = (email) => {
    return `
            <p>Hey admin,</p>
            <p>We got a new enquiry from windows server sopport</p>
            <p>From :</p>
            <p>${email}</p>
            `;
  };
}

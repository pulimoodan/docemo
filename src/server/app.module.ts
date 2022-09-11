import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ViewModule } from './modules/view/view.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { EmailModule } from './modules/email/email.module';
import { PaymentModule } from './modules/payment/payment.module';
import { WebsiteModule } from './modules/website/website.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ViewModule,
    PrismaModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    MailModule,
    EmailModule,
    PaymentModule,
    WebsiteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

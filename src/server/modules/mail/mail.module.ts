import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from '../products/products.module';
import { MailController } from './mail.controller';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    ProductsModule,
    EmailModule,
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController], // 👈 export for DI
})
export class MailModule {}

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
import { AdminModule } from '@adminjs/nestjs';
import { DMMFClass } from '@prisma/client/runtime';
import AdminJS from 'adminjs';
import { PrismaService } from './modules/prisma/prisma.service';
import { Database, Resource } from '@adminjs/prisma';

AdminJS.registerAdapter({ Resource, Database });

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule.createAdminAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: async (prisma: PrismaService) => {
        const dmmf = (prisma as any)._baseDmmf as DMMFClass;
        return {
          auth: {
            authenticate: async (email, password) =>
              Promise.resolve(
                email == process.env.ADMIN_EMAIL &&
                  password == process.env.ADMIN_PASSWORD
                  ? { email: process.env.ADMIN_EMAIL }
                  : null,
              ),
            cookieName: 'test',
            cookiePassword: 'testPass',
          },
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: { model: dmmf.modelMap.Product, client: prisma },
                options: {
                  navigation: {
                    icon: 'InventoryManagement',
                    name: null,
                  },
                  properties: {
                    features: { isArray: true, type: 'string' },
                  },
                },
              },
              {
                resource: { model: dmmf.modelMap.Customer, client: prisma },
                options: {
                  navigation: {
                    icon: 'User',
                    name: null,
                  },
                },
              },
              {
                resource: { model: dmmf.modelMap.Order, client: prisma },
                options: {
                  navigation: {
                    icon: 'Currency',
                    name: null,
                  },
                  properties: {
                    products: {
                      isArray: true,
                      type: dmmf.modelMap.OrderProduct,
                    },
                  },
                },
              },
            ],
          },
        };
      },
    }),
    ViewModule,
    PrismaModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

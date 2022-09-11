import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create three dummy products
  const product1 = await prisma.product.upsert({
    where: { name: 'Bronze' },
    update: {},
    create: {
      name: 'Bronze',
      price: 10,
      per: 'hr',
      features: [
        'Basic assistance',
        'DNS questions',
        'Domain connection for computers',
        'The service is for 1 hour',
      ],
    },
  });

  const product2 = await prisma.product.upsert({
    where: { name: 'Silver' },
    update: {},
    create: {
      name: 'Silver',
      price: 10,
      per: 'hr',
      features: [
        'Mid-Grade assistance',
        'Best practices',
        'Connections to outside services',
        'The service is for 1 hour',
      ],
    },
  });

  const product3 = await prisma.product.upsert({
    where: { name: 'Gold' },
    update: {},
    create: {
      name: 'Gold',
      price: 10,
      per: 'hr',
      features: [
        'Advanced assistance',
        'Multi-site',
        'VPN connections',
        'The service is for 1 hour',
      ],
    },
  });

  console.log(
    `Created products => ${product1.name}, ${product2.name}, ${product3.name}}`,
  );

  await prisma.email.upsert({
    where: { user: 'example@gmail.com' },
    update: {},
    create: {
      host: 'smtp.gmail.com',
      port: 487,
      user: 'example@gmail.com',
      password: '1234567890',
      from: 'noreply@example.com',
      to: 'example@gmail.com',
    },
  });

  await prisma.payment.upsert({
    where: { stripe: 'pk_test_51LeAspSCqHFTkH8OK' },
    update: {},
    create: {
      stripe: 'pk_test_51LeAspSCqHFTkH8OK',
      nowPayments: 'xxxx-XXXX-xxxx-XXXX-xxxx',
    },
  });

  await prisma.website.upsert({
    where: { baseUrl: 'https://example.com' },
    update: {},
    create: {
      currency: 'USD',
      baseUrl: 'https://example.com',
    },
  });

  console.log('Shop settings created');

  const hashedPassword = await bcrypt.hash('1234', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log(`Admin created => ${admin.email}`);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

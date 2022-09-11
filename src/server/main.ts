import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  await app.listen(process.env.PORT, async () => {
    console.log(`Server started at: http://localhost:${process.env.PORT}`);
  });
}
bootstrap();

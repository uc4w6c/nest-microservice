import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'],
      }
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
  console.log(await app.getUrl());
}
bootstrap();

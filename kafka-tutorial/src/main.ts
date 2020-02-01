import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'math',
        brokers: ['localhost:9092'],
      },
      // consumerつけたら動き出した
      consumer: {
        groupId: 'math-consumer',
        allowAutoTopicCreation: true,
      },
      producer: {
        allowAutoTopicCreation: true,
      },
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
  console.log(await app.getUrl());
}
bootstrap();

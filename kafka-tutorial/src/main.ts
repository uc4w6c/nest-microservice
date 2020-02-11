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
        // brokers: ['localhost:9092'],
        // brokers: ['kafka1:29092', 'kafka2:29093', 'kafka3:29094'],
        brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
      },
      /*
      consumer: {
        groupId: 'math-consumer',
        // allowAutoTopicCreation: true,
      },*/
      /*producer: {
        allowAutoTopicCreation: true,
      },*/
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
  console.log(await app.getUrl());
}
bootstrap();

import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


  /**
   * Client機能を提供しない場合はこうする
   * 
   * This example contains a hybrid application (HTTP + TCP)
   * You can switch to a microservice with NestFactory.createMicroservice() as follows:
   *
   * async function bootstrap() {
   *   const app = await NestFactory.createMicroservice(AppModule, {
   *    transport: Transport.TCP,
   *    options: { retryAttempts: 5, retryDelay: 3000 },
   *   });
   *   await app.listenAsync();
   * }
   */

// Client機能も提供しつつRedisを利用する場合はこのような記載をする
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3001);
  console.log(await app.getUrl());
}
bootstrap();

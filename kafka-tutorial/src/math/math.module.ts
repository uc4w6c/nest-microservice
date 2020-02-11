import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { MathController } from './math.controller';
import { MathMessagesController } from './math.messages.controller';
import { ClientsModule } from '@nestjs/microservices';
import { MATH_SERVICE } from './math.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MATH_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'math',
            // brokers: ['localhost:9092'],
            // brokers: ['kafka1:29092', 'kafka2:29093', 'kafka3:29094'],
            brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
          },
          // consumerつけたら動き出した
          consumer: {
            groupId: 'math-consumer'
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        }
      },
    ]),
  ],
  controllers: [MathController, MathMessagesController]
})
export class MathModule {}

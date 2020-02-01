import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { MathController } from './math.controller';
import { ClientsModule } from '@nestjs/microservices';
import { MATH_SERVICE } from './math.constants';

@Module({
  imports: [
    // ClientsModule.register([{ name: MATH_SERVICE, transport: Transport.TCP }]),
    ClientsModule.register([
      {
        name: MATH_SERVICE,
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6380',
        }
      }
    ]),
  ],
  controllers: [MathController]
})
export class MathModule {}

import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MATH_SERVICE } from './math.constants';

@Controller('math')
export class MathController implements OnModuleInit {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('math.sum');
  }

  // pub
  @Get()
  execute(): Observable<number> {
    const pattern = 'math.sum';
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, {
      numbers: data,
    });
  }

}

import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MATH_SERVICE } from './math.constants';

@Controller('math')
export class MathController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}
  
  // pub
  @Get()
  execute(): Observable<number> {
    // const pattern = { cmd: 'sum' };
    const pattern = 'sum';
    const data = [1, 2, 3, 4, 5];
    console.log('get');
    return this.client.send<number>(pattern, data);
  }

  // sub
  // @MessagePattern({ cmd: 'sum' })
  @MessagePattern('sum')
  sum(data: number[]): number {
    console.log('sum');
    return (data || []).reduce((a, b) => a + b);
  }
}

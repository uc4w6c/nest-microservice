import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MATH_SERVICE } from './math.constants';

@Controller('math')
export class MathController implements OnModuleInit {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('math.sum');
    this.client.subscribeToResponseOf('math.sum.test');
    this.client.connect();
  }

  // pub
  /*
  @Get()
  execute(): Observable<number> {
    const pattern = 'math.sum';
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, {
      numbers: data,
    });
  }
  */
  @Get()
  // async execute(): Promise<Observable<number>> {
  async execute(): Promise<Observable<any>> {
    const pattern = 'math.sum';
    const data = [1, 2, 3, 4, 5];
    // const result = await this.client.send<number>(pattern, {
    console.log('send start')
    const result = await this.client.send(pattern, {
      numbers: data,
    }).toPromise();
    console.log('send ent')

    return result;
  }

  @Get('test')
  async test(): Promise<Observable<any>> {
    console.log('test');
    const result = await this.client
      .send('math.sum.test', {
        value: {
          numbers: 1,
        },
      })
      .toPromise();
    return result;
  }
}

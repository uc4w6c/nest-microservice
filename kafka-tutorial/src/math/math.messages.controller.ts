import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MATH_SERVICE } from './math.constants';

@Controller()
export class MathMessagesController {

  // sub
  @MessagePattern('math.sum')
  // sum(data: number[]): number {
  sum(data: any): number {
    console.log('sub');
    return (data.value.numbers || []).reduce((a, b) => a + b);
  }

  @MessagePattern('math.sum.test')
  mathSumSyncWithoutKey(data: any) {
    return (data.value.numbers || []).reduce((a, b) => a + b);
  }
}

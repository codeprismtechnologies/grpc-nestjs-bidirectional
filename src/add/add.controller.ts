import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { AddService } from './add.service';
import {app} from '../generated/test'
import { Observable, Subject } from 'rxjs';
@Controller('add')
export class AddController {
    constructor(private readonly addService: AddService){}
    private logger = new Logger('AddController');

  @GrpcStreamMethod('AppController', 'Accumulate')
  accumulate(messages: Observable<app.NumberArray>, metadata: any):Observable<any> {
    const subject = new Subject();
    const sumResponse = new app.SumOfNumberArray();
    const onNext = message => {
      console.log(message);
      sumResponse.sum = this.addService.accumulate(message.data) ;
      this.logger.log('Adding ' + message.data.toString());
      subject.next(sumResponse);
    };
    const onComplete = () => subject.complete();
    messages.subscribe(onNext, null, onComplete);
    return subject.asObservable();
  }
}

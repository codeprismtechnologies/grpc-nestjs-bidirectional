import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `localhost:${process.env.PORT || 5000}`,
      package: 'app',
      protoPath: join(__dirname, './proto/test.proto'),
    },
  });  
  app.listen(() => {
    logger.log(`Microservice is listening on ${process.env.PORT || 5000} ...`);
  });}
bootstrap();

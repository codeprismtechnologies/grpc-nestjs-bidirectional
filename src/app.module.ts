import { Module } from '@nestjs/common';
import { AddModule } from './add/add.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AddModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

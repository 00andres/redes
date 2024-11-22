import { Module } from '@nestjs/common';
import { WebsocketsModule } from './websockets.module';
import { AppController } from './app.controller';

@Module({
  imports: [WebsocketsModule],
  controllers: [AppController],
})
export class AppModule {}

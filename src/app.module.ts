import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {ProxyModule} from './proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {} 

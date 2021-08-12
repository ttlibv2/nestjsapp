import { HttpModuleOptions, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import * as https from 'https';

const httpModuleOption: HttpModuleOptions = {
 
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })

};

@Module({
 imports:[ HttpModule.register(httpModuleOption)],
  controllers: [ProxyController],
  providers: [ProxyService]
})
export class ProxyModule {}

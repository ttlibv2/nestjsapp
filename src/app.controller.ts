import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('proxy')
  // async sendProxy(@Query('url') url: string, @Res() res: Response) {
  //   let resp = await this.appService.sendProxy(url).toPromise();
  //   return res.status(resp.status).header(resp.headers).send(resp.data);
  // }
}

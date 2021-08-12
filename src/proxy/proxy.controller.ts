import { HttpService } from '@nestjs/axios';
import { All, Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import { ProxyService } from './proxy.service';
import { ProxyOption } from './proxy-option';




@Controller("proxy")
export class ProxyController {

  constructor(private http: ProxyService) {}

   @Get(':url(*)')
   async sendProxy(@Param('url') url: string, @Req() req: Request, @Res() res: Response):Promise<any> {
    
    let option = ProxyOption.create({
      url: url,
      method: <any>req.method,
      baseURL: req.baseUrl,
      headers: req.headers,
      params: req.query,
      //data: req.body
    });

    let all = await this.http.all(option)
      .toPromise().catch(e => {
        console.log(e.data);
        return e;
      });

    return res.status(all.status).header(all.header).send(all.data);
  }

 
 

}
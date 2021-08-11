import { HttpService } from '@nestjs/axios';
import { All, Controller, Param, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

function assign(target: any, source: any, noSetFnc?: (key: string, value: any) => boolean) {
  noSetFnc = noSetFnc || (() => true);
  for(let sp in source) {
    if(noSetFnc(sp, source[sp])) continue;
    else target[sp] = source[sp];
  }
  return target;
}

function getHeaderFromRequest(header: any) {
  let headerIdDel = ['host', 'x-real-ip', 'x-forwarded-host', 'x-forwarded-for',  'x-forwarded-port', 
  'x-forwarded-proto', 'x-scheme', 'x-original-forwarded-for',
   'cf-ipcountry', 'cf-ray', 'cf-visitor', 'cf-ew-via', 'cdn-loop', 'cf-connecting-ip'
  ];
  return assign({}, header, (k:string) => headerIdDel.includes(k));
}


@Controller("proxy")
export class ProxyController {

  constructor(private http: HttpService) {}


  @All(':url(*)')
  async sendProxy(@Param('url') url: string, @Req() req: Request, @Res() res: Response) {

    let configReq: AxiosRequestConfig = {
      method: 'get',
      url: url,
      params: req.query,
      headers: getHeaderFromRequest(req.headers)
    };

    let resp: AxiosResponse = await this.http.request(configReq)
      .toPromise().catch((e:AxiosError) =>  e.response);

    return res.status(resp.status)
      .header(resp.headers)
      .send(resp.data);
  }

 
 

}
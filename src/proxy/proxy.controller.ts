import { HttpService } from '@nestjs/axios';
import { All, Controller, Param, Query, Req} from '@nestjs/common';
import {Request} from 'express';
import {AxiosRequestConfig} from 'axios';

function assign(target: any, source: any, noSetFnc?: (key: string, value: any) => boolean) {
  noSetFnc = noSetFnc || (() => true);
  for(let sp in source) {
    if(noSetFnc(sp, source[sp])) continue;
    else target[sp] = source[sp];
  }
  return target;
}

function getHeaderFromRequest(header: any) {
  let headerIdDel = ['host', 'x-real-ip', 
  'x-forwarded-host', 'x-forwarded-for',  'x-forwarded-port', 
  'x-forwarded-proto', 'x-scheme', 'x-original-forwarded-for',
  'true-client-ip','connection',
   'cf-ipcountry', 'cf-ray', 'cf-visitor', 'cf-ew-via', 
   'cdn-loop', 'cf-connecting-ip', 'cf-worker',
   //'sec-ch-ua'
  ];
  return assign({}, header, (k:string) => headerIdDel.includes(k));
}


@Controller()//("proxy")
export class ProxyController {

  constructor(private http: HttpService) {}

  @All(':url(*)')
  async sendProxy(@Param('url') url: string, @Req() req: Request) {
    //let query = req.query;

    let configReq: AxiosRequestConfig = {
      method: 'get',
      url: url,
      params: req.query,
      headers: getHeaderFromRequest(req.headers)
    };
    

    return this.http.request(configReq).toPromise()
      .then(s => Promise.resolve(s.status))
      .catch(() => {
        console.log(`error url: ${url}`);
        //return Promise.reject('xay ra loi: 500');
      })
    

  
  }

 
 

}
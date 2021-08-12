import { HttpService } from '@nestjs/axios';
import { All, Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {AxiosRequestConfig, AxiosError} from 'axios';

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


@Controller("proxy")
export class ProxyController {

  constructor(private http: HttpService) {}

   @Get(':url(*)')
   async sendProxy(@Param('url') url: string, @Req() req: Request):Promise<any> {
    //let query = req.query;

    let configReq: AxiosRequestConfig = {
      method: 'get',
      url: url,
      params: req.query,
      responseType: 'text',
      headers: {
        'user-agent': req.headers['user-agent'],
        'accept': req.headers.accept
      }
    };
    

    let ss = await this.http.request(configReq).toPromise()
    .catch((e: AxiosError) => {
      
      let req: Request = e.request;
      let log = {
        data: {
          config: {
            headers: e.config.headers,
            url: e.config.url,
            baseUrl: e.config.baseURL,
            payload: e.config.data,
            method: e.config.method
          },
          request: {
            headers: req.headers,
            url: req.url,
            baseUrl: req.baseUrl,
            query: req.query,
            status: req.statusCode
          }
        }
      };

      console.log(log);
      return Promise.resolve(log);
    });

    return ss;
  }

 
 

}
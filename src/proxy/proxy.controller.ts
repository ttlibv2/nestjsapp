import { HttpService } from '@nestjs/axios';
import { All, Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { Observable, Observer, of, throwError, pipe, interval, empty } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

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


  @Get(':url(*)')
  async sendProxy(@Param('url') url: string, @Req() req: Request, @Res() res: Response) {

    let headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    };
    let configReq: AxiosRequestConfig = {
      method: 'get',
      url: url,
      //params: req.query,
      headers: getHeaderFromRequest(req.headers)
    };
    
    console.log(url);

    let resp = await this.http.request(configReq).pipe(
      catchError((e: AxiosError) => {
        console.log(e);
        
        return of({status: 500, data: 'error server'})
      })).toPromise();

    return res//.status(resp.status)
     // .header(resp.headers)
      .send(resp.data);
  }

 
 

}
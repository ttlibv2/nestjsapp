import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, switchMap } from 'rxjs/operators';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Observable, of, throwError } from 'rxjs';
import { ProxyOption, PROXY_ERROR } from './proxy-option';
import {ProxyHelper} from './proxy-helper';

import * as fs from 'fs';
import * as http from 'http';


@Injectable()
export class ProxyService {

  constructor(private http: HttpService) {}

  removeHeader(req: http.IncomingHttpHeaders) {
    return req.headers;
  }

  all(option: ProxyOption): Observable<any> {
    option = ProxyOption.createIfNull(option);
    option.handleError = option.handleError || this.handleError;
    option.handleOki = option.handleOki || this.handleOki;

    let config: AxiosRequestConfig = option.config;
    
    // fix payload
    if(!ProxyHelper.requiresRequestBody(config.method)) {
      config.data = undefined;
    }

    return this.http.request(config).pipe(
      catchError(option.handleError),
      switchMap(option.handleOki)
    );
  }

  protected handleError(error: AxiosError) {
    
    if (!!error.code && !(error.code in PROXY_ERROR)) {
      let msg = '\n' + `=`.repeat(20);
      msg += `\nTime: ${new Date().toISOString()}`
      msg += `\nurl: ${error.config.url}`;
      msg += `\nmethod: ${error.config.method}`;
      msg += `\npayload: ${error.config.data}`;
      msg += `\ncode: ${error.code}`;
      msg += `\nstack: ${error.stack}`;
      msg += `\n\n`;
      
      fs.createWriteStream('./proxy_error.err', {flags: 'a'})
      .end(msg);
    }

    // [AxiosResponse]
    if(error.response !== undefined) {
      let r = error.response;
      let data = r.data || {code: `client_${r.status}`};
      return throwError({...r, data, isError: true});
    }

    // 
    else return throwError({
      status: 500,
      headers: error.request?.headers,
      code: error.code,
      url: error.config?.url,
      message: PROXY_ERROR[error.code], 
      error: true
    })
  }

  protected handleOki(resp: any) {
    return of(resp);
  }

}

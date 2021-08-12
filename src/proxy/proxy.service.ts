import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, switchMap } from 'rxjs/operators';
import { Method, AxiosError } from 'axios';
import * as http from 'http';
import { Observable, of, throwError } from 'rxjs';
import { ProxyOption } from './proxy-option';


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

    console.log(option.config);
    console.log(`-------------`);
    
    let handle = this.http.request(option.config);
    
    return handle.pipe(
      catchError(option.handleError),
      switchMap(option.handleOki)
    );
  }














  protected handleError(error: AxiosError) {

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
      data: error.message,
      isError: true
    })
  }

  protected handleOki(resp: any) {
    return of(resp);
  }
}

import {AxiosError, AxiosResponse, Method, ResponseType, AxiosRequestConfig} from 'axios';
import { Observable } from 'rxjs';


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
  'x-forwarded-host', '-x-forwarded-for',  'x-forwarded-port', 
  'x-forwarded-proto', 'x-scheme', '-x-original-forwarded-for',
  'true-client-ip','connection',
   'cf-ipcountry', 'cf-ray', 'cf-visitor', 'cf-ew-via', 
   'cdn-loop', 'cf-connecting-ip', 'cf-worker',
   //'sec-ch-ua'
  ];
  return assign({}, header, (k:string) => headerIdDel.includes(k));
}

export class ProxyOption {

  static createIfNull(option: ProxyOption): ProxyOption {
    return !!option ? option : new ProxyOption();
  } 

  static create(config?: AxiosRequestConfig): ProxyOption {
    return new ProxyOption(config);
  }
 
  /** callback handle error */
  handleError?: (error: AxiosError) => Observable<any>;

  /** callback handle success */
  handleOki?:(response: AxiosResponse) => Observable<AxiosResponse>;


  constructor(public readonly config?: AxiosRequestConfig) {
    this.config = config || {};
    this.config.headers = getHeaderFromRequest(this.config.headers);
  }





}

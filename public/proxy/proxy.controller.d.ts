import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
export declare class ProxyController {
    private http;
    constructor(http: HttpService);
    sendProxy(url: string, req: Request): Promise<any>;
}

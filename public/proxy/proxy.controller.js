"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
function assign(target, source, noSetFnc) {
    noSetFnc = noSetFnc || (() => true);
    for (let sp in source) {
        if (noSetFnc(sp, source[sp]))
            continue;
        else
            target[sp] = source[sp];
    }
    return target;
}
function getHeaderFromRequest(header) {
    let headerIdDel = ['host', 'x-real-ip',
        'x-forwarded-host', 'x-forwarded-for', 'x-forwarded-port',
        'x-forwarded-proto', 'x-scheme', 'x-original-forwarded-for',
        'true-client-ip', 'connection',
        'cf-ipcountry', 'cf-ray', 'cf-visitor', 'cf-ew-via',
        'cdn-loop', 'cf-connecting-ip', 'cf-worker',
    ];
    return assign({}, header, (k) => headerIdDel.includes(k));
}
let ProxyController = class ProxyController {
    constructor(http) {
        this.http = http;
    }
    async sendProxy(url, req) {
        let configReq = {
            method: 'get',
            url: url,
            params: req.query,
            responseType: 'text',
            headers: getHeaderFromRequest(req.headers)
        };
        return configReq;
    }
};
__decorate([
    common_1.Get(':url(*)'),
    __param(0, common_1.Param('url')),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "sendProxy", null);
ProxyController = __decorate([
    common_1.Controller("proxy"),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ProxyController);
exports.ProxyController = ProxyController;
//# sourceMappingURL=proxy.controller.js.map
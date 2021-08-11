"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const proxy_controller_1 = require("./proxy.controller");
const https = require("https");
const httpModuleOption = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
};
let ProxyModule = class ProxyModule {
};
ProxyModule = __decorate([
    common_1.Module({
        imports: [axios_1.HttpModule.register(httpModuleOption)],
        controllers: [proxy_controller_1.ProxyController],
        exports: []
    })
], ProxyModule);
exports.ProxyModule = ProxyModule;
//# sourceMappingURL=proxy.module.js.map
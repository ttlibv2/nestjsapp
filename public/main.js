"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(5000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
        console.log(`module.hot`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
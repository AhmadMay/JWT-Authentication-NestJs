"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    console.log("hellow");
    let port = process.env.PORT || 3000;
    await app.listen(port, () => {
        console.log(`App is running on the port ${port},`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
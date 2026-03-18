"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configuredOrigins = (process.env.ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
    if (configuredOrigins.length > 0) {
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin || configuredOrigins.includes(origin)) {
                    callback(null, true);
                    return;
                }
                callback(new Error(`CORS blocked for origin: ${origin}`), false);
            },
        });
    }
    else {
        app.enableCors();
    }
    const port = Number(process.env.PORT ?? 4000);
    await app.listen(port);
    console.log(`Nest backend listening on port ${port}`);
}
bootstrap();

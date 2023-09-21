"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma.service");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const PORT = +process.env.PORT;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: 'GET,POST,PATCH,OPTIONS,DELETE'
    });
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    const IP = '0.0.0.0';
    const FINAL_PORT = PORT || 8000;
    await app.listen(FINAL_PORT, IP, () => console.log(`The server is up and listening at http://${IP}:${FINAL_PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map
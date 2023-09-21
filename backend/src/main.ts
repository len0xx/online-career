import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'

const PORT = +process.env.PORT

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    )

    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: 'GET,POST,PATCH,OPTIONS,DELETE'
    })

    const prismaService = app.get(PrismaService)
    await prismaService.enableShutdownHooks(app)

    const IP = '0.0.0.0'
    const FINAL_PORT = PORT || 8000

    await app.listen(FINAL_PORT, IP, () =>
        console.log(
            `The server is up and listening at http://${IP}:${FINAL_PORT}`
        )
    )
}

bootstrap()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import fastifyCookie from '@fastify/cookie'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'

const NODE_ENV = process.env.NODE_ENV
const PORT = +process.env.PORT
const COOKIE_SIGNATURE = process.env.COOKIE_SIGNATURE
const ORIGIN = NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://xn----7sbbhpbxldpedi9aeb1qpa7c.xn--p1ai'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    )

    await app.register(fastifyCookie, {
        secret: COOKIE_SIGNATURE,
    })

    app.enableCors({
        origin: ORIGIN,
        credentials: true,
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

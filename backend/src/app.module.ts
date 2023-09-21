import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { HealthController } from './health.controller'
import { UserService } from './user.service'
import { PrismaService } from './prisma.service'

@Module({
    imports: [],
    controllers: [UserController, HealthController],
    providers: [PrismaService, UserService]
})
export class AppModule {}

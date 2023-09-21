import {
    Controller,
    Get,
    Header,
} from '@nestjs/common'

@Controller('api/healthcheck')
export class HealthController {
    constructor() {}

    @Get()
    @Header('Content-Type', 'application/json')
    async checkHealth(): Promise<string> {
        const response = {
            ok: true,
            message: 'Healthy'
        }
        return JSON.stringify(response)
    }
}

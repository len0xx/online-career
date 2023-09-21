import * as jwt from 'jsonwebtoken'
import { ExtendedUser, FullUser, UserService } from './user.service'
import { PrismaService } from './prisma.service'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import UserDto from './user.dto'
import { IncomingMessage } from 'http'

const AUTH_SECRET = process.env.AUTH_SECRET

export async function decodeToken(token: string): Promise<FullUser | null> {
    const prismaService = new PrismaService()
    const userService = new UserService(prismaService)

    try {
        const payload = jwt.verify(token, AUTH_SECRET!) as UserDto
        const user = (await userService.get({ id: payload.id })) as FullUser
        return user || null
    } catch (e) {
        return null
    }
}

export const Authorization = createParamDecorator(
    async (
        { sanitize }: { sanitize: boolean } = { sanitize: true },
        ctx: ExecutionContext
    ): Promise<ExtendedUser | null> => {
        const request = ctx.switchToHttp().getRequest() as IncomingMessage
        const { authorization: accessToken } = request.headers

        try {
            const user = await decodeToken(accessToken)
            if (sanitize) delete user.password
            return user
        } catch (e) {
            return null
        }
    }
)

export type NOTISEND_ALLOWED_GROUPS = '425826' | '425874'
export const NOTISEND_WELCOME_GROUP: NOTISEND_ALLOWED_GROUPS = '425826'
export const NOTISEND_RESET_GROUP: NOTISEND_ALLOWED_GROUPS = '425874'
const NOTISEND_PARAMETER_WELCOME = 300291
const NOTISEND_PARAMETER_RESET = 300292
const NOTISEND_TOKEN = 'a0b9de66365e7dabfe152d326e06c846'
const NOTISEND_BASE_URI = 'https://api.notisend.ru/v1'

export const addNotisendRecipient = async (group: NOTISEND_ALLOWED_GROUPS, email: string, code: string) => {
    const url = `${NOTISEND_BASE_URI}/email/lists/${group}/recipients`
    const parameter_id = group === NOTISEND_WELCOME_GROUP ? NOTISEND_PARAMETER_WELCOME : NOTISEND_PARAMETER_RESET
    const payload = {
        email,
        values: [
            {
                parameter_id,
                value:
                    'https://онлайн-времякарьеры.рф/restore/new-pass/?code=' +
                    code
            }
        ]
    }

    return await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${NOTISEND_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

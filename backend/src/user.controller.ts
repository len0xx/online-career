import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Res,
    UnauthorizedException
} from '@nestjs/common'
import { ExtendedUser, UserService } from './user.service'
import { compare, hash } from 'bcrypt'
import { FastifyReply } from 'fastify'
import * as jwt from 'jsonwebtoken'
import {
    Authorization,
    NOTISEND_RESET_GROUP,
    NOTISEND_WELCOME_GROUP,
    addNotisendRecipient
} from './auth.utilities'
import { createHash } from 'crypto'
import { AuthUserDto, CreateUserDto, SetPasswordUserDto } from './user.dto'

const { NEST_AUTH_SECRET } = process.env

const generateCode = (email: string) => {
    const time = +new Date()
    const random = Math.random() * 100
    return createHash('md5').update(`${time}.${email}.${random}`).digest('hex')
}

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUserDto): Promise<string> {
        if (!data.email || !data.firstName || !data.lastName) {
            throw new BadRequestException(
                'Поля "Email", "Имя" и "Фамилия" обязательны к заполнению'
            )
        }

        const existingUser = await this.userService.getByEmail(data.email)
        if (existingUser) {
            throw new BadRequestException(
                'Пользователь с таким Email уже существует'
            )
        }

        const code = generateCode(data.email)

        try {
            const user = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                code
            }
            await this.userService.create(user)
            await addNotisendRecipient(NOTISEND_WELCOME_GROUP, data.email, code)
            return JSON.stringify({ ok: true, created: true })
        } catch (e) {
            console.error(e)
            throw new BadRequestException('Не удалось создать пользователя')
        }
    }

    @Post('set-pass')
    @Header('Content-Type', 'application/json')
    async setPassword(@Body() data: SetPasswordUserDto): Promise<string> {
        if (!data.code) {
            throw new BadRequestException(
                'Код для восстановления пароля не указан, попробуйте перейти по ссылке из письма ещё раз'
            )
        }

        if (
            !data.password ||
            !data.passwordRepeat ||
            data.password !== data.passwordRepeat
        ) {
            throw new BadRequestException('Введенные пароли не совпадают')
        }

        const user = await this.userService.getByCode(data.code)
        if (!user)
            throw new BadRequestException(
                'Указан неверный или недействительный код для восстановления пароля'
            )

        try {
            data.password = await hash(data.password, 14)
            await this.userService.update(
                { code: data.code },
                { password: data.password }
            )
            return JSON.stringify({ ok: true })
        } catch (e) {
            console.error(e)
            throw new BadRequestException(
                'Не удалось установить пароль, попробуйте повторить попытку позднее'
            )
        }
    }

    @Post('forgot-pass')
    @Header('Content-Type', 'application/json')
    async forgotPassword(@Body() data: { email: string }): Promise<string> {
        if (!data.email) {
            throw new BadRequestException(
                'Пожалуйста укажите Email для восстановления пароля'
            )
        }

        try {
            const user = await this.userService.getByEmail(data.email)
            if (user) {
                const code = generateCode(data.email)
                await this.userService.update({ email: data.email }, { code })
                await addNotisendRecipient(
                    NOTISEND_RESET_GROUP,
                    data.email,
                    code
                )
            }
            return JSON.stringify({ ok: true })
        } catch (e) {
            console.error(e)
            throw new BadRequestException(
                'Не удалось отправить письмо для восстановления пароля, попробуйте позже'
            )
        }
    }

    @Post('auth')
    @Header('Content-Type', 'application/json')
    async auth(@Body() data: AuthUserDto, @Res({ passthrough: true }) response: FastifyReply): Promise<string> {
        if (!data.email || !data.password) {
            throw new BadRequestException('Заполните поля "Email" и "Пароль"')
        }

        const user = await this.userService.getByEmail(data.email)
        if (!user)
            throw new BadRequestException(
                'Пользователь с таким Email не найден'
            )

        const match = await compare(data.password, user.password)
        if (!match)
            throw new BadRequestException('Указана неверная пара Email/Пароль')

        const payload: Record<string, string | number> = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        const token = jwt.sign(payload, NEST_AUTH_SECRET, {
            expiresIn: 7 * 24 * 60 * 60
        })
        payload.token = token
        const expireDate = new Date( new Date().setDate( new Date().getDate() + 1 ) )
        response.setCookie('token', token, { secure: true, httpOnly: true, expires: expireDate })
        return JSON.stringify({ ok: true, payload })
    }

    @Get()
    @Header('Content-Type', 'application/json')
    async getAuthorized(@Authorization() user: ExtendedUser): Promise<string> {
        if (!user) {
            throw new UnauthorizedException(
                'You must authorize first to access this resource'
            )
        }

        const id = user.id

        try {
            const data = await this.userService.get({ id }, true)
            return JSON.stringify({ ok: true, data })
        } catch (e) {
            console.error(e)
            throw new BadRequestException('Could not get user data')
        }
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<string> {
        try {
            const data = await this.userService.get({ id }, true)
            return JSON.stringify({ ok: true, data })
        } catch (e) {
            console.error(e)
            throw new BadRequestException('Could not get user data')
        }
    }
}

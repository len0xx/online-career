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
import { Authorization } from './auth.utilities'
import { AuthUserDto, CreateUserDto, SetPasswordUserDto } from './user.dto'
import {
    ValidationSchema,
    emailRegex,
    validateSchema,
    NOTISEND_RESET_GROUP,
    NOTISEND_WELCOME_GROUP,
    addNotisendRecipient,
    generateCode,
    regions,
    allowedStatuses
} from './util'

const { NEST_AUTH_SECRET, NODE_ENV } = process.env

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUserDto): Promise<string> {
        const schema: ValidationSchema<string> = {
            firstName: {
                minLen: 2,
                maxLen: 30,
                required: true,
                errorText: 'Поле "Имя" должно быть от 2 до 30 символов в длину'
            },
            lastName: {
                minLen: 2,
                maxLen: 30,
                required: true,
                errorText:
                    'Поле "Фамилия" должно быть от 2 до 30 символов в длину'
            },
            patronimyc: {
                minLen: 2,
                maxLen: 30,
                required: true,
                errorText:
                    'Поле "Отчество" должно быть от 2 до 30 символов в длину'
            },
            region: {
                isIn: regions,
                required: true,
                errorText: 'Указано некорректное значение поля "Регион"'
            },
            status: {
                isIn: allowedStatuses,
                required: true,
                errorText: 'Указано некорректное значение поля "Статус"'
            },
            phone: {
                minLen: 11,
                maxLen: 20,
                required: true,
                errorText:
                    'Номер телефона должен содержать от 11 до 20 символов, например: +79990009900'
            },
            email: {
                match: emailRegex,
                required: true,
                errorText: 'Пожалуйста укажите корректный Email'
            }
        }

        try {
            validateSchema(schema, data as unknown as Record<string, string>)
        } catch (e) {
            throw new BadRequestException(e.message)
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
            if (NODE_ENV !== 'dev')
                await addNotisendRecipient(
                    NOTISEND_WELCOME_GROUP,
                    data.email,
                    code
                )
            return JSON.stringify({ ok: true, created: true })
        } catch (e) {
            console.error(e)
            throw new BadRequestException('Не удалось создать пользователя')
        }
    }

    @Post('set-pass')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
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

        const schema: ValidationSchema<string> = {
            password: {
                minLen: 6,
                maxLen: 30,
                required: true,
                errorText: 'Пароль должен быть длиной от 6 до 30 символов'
            }
        }

        try {
            validateSchema(schema, { password: data.password })
        } catch (e) {
            throw new BadRequestException(e.message)
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
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() data: { email: string }): Promise<string> {
        if (!data.email) {
            throw new BadRequestException(
                'Пожалуйста укажите Email для восстановления пароля'
            )
        }

        const schema: ValidationSchema<string> = {
            email: {
                match: emailRegex,
                errorText: 'Пожалуйста укажите корректный Email'
            }
        }

        try {
            validateSchema(schema, { email: data.email })
        } catch (e) {
            throw new BadRequestException(e.message)
        }

        try {
            const user = await this.userService.getByEmail(data.email)
            if (user) {
                const code = generateCode(data.email)
                await this.userService.update({ email: data.email }, { code })
                if (NODE_ENV !== 'dev')
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
    @HttpCode(HttpStatus.OK)
    async auth(
        @Body() data: AuthUserDto,
        @Res({ passthrough: true }) response: FastifyReply
    ): Promise<string> {
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
        const date = new Date()
        date.setDate(date.getDate() + 7)
        response.setCookie('token', token, {
            secure: true,
            httpOnly: true,
            expires: date,
            path: '/'
        })
        return JSON.stringify({ ok: true, payload })
    }

    @Get('logout')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Res({ passthrough: true }) response: FastifyReply
    ): Promise<string> {
        const date = new Date()
        date.setDate(date.getDate() - 1)
        response.setCookie('token', null, {
            secure: true,
            httpOnly: true,
            expires: date,
            path: '/'
        })
        return JSON.stringify({ ok: true })
    }

    @Get('validate')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
    async getAuthorized(@Authorization() user: ExtendedUser): Promise<string> {
        if (!user) {
            throw new UnauthorizedException(
                'Для доступа к этому ресурсу необходимо авторизоваться'
            )
        }

        const id = user.id

        try {
            const data = await this.userService.get({ id }, true)
            return JSON.stringify({ ok: true, user: data })
        } catch (e) {
            console.error(e)
            throw new BadRequestException('Не удалось подтвердить авторизацию')
        }
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    @HttpCode(HttpStatus.OK)
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

import { Role } from '@prisma/client'

export default class UserDto {
    id: number
    email: string
    firstName?: string
    lastName?: string
    password: string
    role: Role
    code: string
}

export class CreateUserDto {
    email: string
    firstName?: string
    lastName?: string
    password?: string
    code: string
}

export class UpdateUserDto {
    email: string
    firstName: string
    lastName: string
}

export class AuthUserDto {
    email: string
    password: string
    token: string
}

export class SetPasswordUserDto {
    code: string
    password: string
    passwordRepeat: string
}

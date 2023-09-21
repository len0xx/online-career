export default class UserDto {
    id: number
    email: string
    firstName?: string
    lastName?: string
    password: string
    role: string
}

export class CreateUserDto {
    email: string
    firstName?: string
    lastName?: string
    password: string
    passwordRepeat: string
}

export class UpdateUserDto {
    email: string
    firstName: string
    lastName: string
}

export class UpdatePasswordDto {
    password: string
    newPassword: string
    newPasswordRep: string
}

export class AuthUserDto {
    email: string
    password: string
    token: string
}

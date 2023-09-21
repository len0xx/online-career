export default class UserDto {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    role: string;
}
export declare class CreateUserDto {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    passwordRepeat: string;
}
export declare class UpdateUserDto {
    email: string;
    firstName: string;
    lastName: string;
}
export declare class UpdatePasswordDto {
    password: string;
    newPassword: string;
    newPasswordRep: string;
}
export declare class AuthUserDto {
    email: string;
    password: string;
    token: string;
}

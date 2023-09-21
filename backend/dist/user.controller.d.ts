import { ExtendedUser, UserService } from "./user.service";
import { AuthUserDto, CreateUserDto } from "./user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<string>;
    auth(data: AuthUserDto): Promise<string>;
    getAuthorized(user: ExtendedUser): Promise<string>;
    getById(id: number): Promise<string>;
}

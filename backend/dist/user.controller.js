"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const bcrypt_1 = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_utilities_1 = require("./auth.utilities");
const user_dto_1 = require("./user.dto");
const NEST_ACCESS_TOKEN = process.env.NEST_ACCESS_TOKEN;
const NEST_AUTH_SECRET = process.env.AUTH_SECRET;
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(data) {
        if (!data.email || !data.firstName || !data.lastName || !data.password || !data.passwordRepeat) {
            throw new common_1.BadRequestException('Fields "email", "firstName", "lastName" and "password" are required');
        }
        const existingUser = await this.userService.getByEmail(data.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        if (data.password !== data.passwordRepeat) {
            throw new common_1.BadRequestException('Passwords don\'t match');
        }
        data.password = await (0, bcrypt_1.hash)(data.password, 14);
        try {
            const user = {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName
            };
            await this.userService.create(user);
            return JSON.stringify({ created: true });
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Could not create a new user');
        }
    }
    async auth(data) {
        if (!data.email || !data.password) {
            throw new common_1.BadRequestException('Invalid "email" or "password"');
        }
        if (!data.token || data.token !== NEST_ACCESS_TOKEN) {
            throw new common_1.UnauthorizedException('Unauthorized application');
        }
        const user = await this.userService.getByEmail(data.email);
        if (!user)
            throw new common_1.BadRequestException('Invalid "email" or "password"');
        const match = await (0, bcrypt_1.compare)(data.password, user.password);
        if (!match)
            throw new common_1.BadRequestException('Invalid "email" or "password"');
        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName
        };
        const token = jwt.sign(payload, NEST_AUTH_SECRET, { expiresIn: 7 * 24 * 60 * 60 });
        payload.backendToken = token;
        return JSON.stringify(payload);
    }
    async getAuthorized(user) {
        if (!user) {
            throw new common_1.UnauthorizedException('You must authorize first to access this resource');
        }
        const id = user.id;
        try {
            const data = await this.userService.get({ id }, true);
            return JSON.stringify(data);
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Could not get user data');
        }
    }
    async getById(id) {
        try {
            const data = await this.userService.get({ id }, true);
            return JSON.stringify(data);
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Could not get user data');
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('auth'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AuthUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "auth", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, auth_utilities_1.Authorization)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAuthorized", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
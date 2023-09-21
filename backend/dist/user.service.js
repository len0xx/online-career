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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getFullName(user) {
        return `${user.firstName} ${user.lastName}`;
    }
    sanitize(user) {
        if (!user)
            return null;
        delete user.password;
        delete user.role;
        return user;
    }
    extend(user, sanitize = false) {
        if (!user)
            return null;
        return Object.assign(Object.assign({}, (sanitize ? this.sanitize(user) : user)), { fullName: this.getFullName(user) });
    }
    async get(where, sanitize = false) {
        return this.extend(await this.prisma.user.findUnique({ where }), sanitize);
    }
    async getByEmail(email, sanitize = false) {
        return this.extend(await this.prisma.user.findFirst({ where: { email } }), sanitize);
    }
    async getAll(args, sanitize = false) {
        return (await this.prisma.user.findMany(args)).map(user => this.extend(user, sanitize));
    }
    async create(data) {
        return this.extend(await this.prisma.user.create({ data }));
    }
    async delete(where) {
        try {
            await this.prisma.user.deleteMany({ where });
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
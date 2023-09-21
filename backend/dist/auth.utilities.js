"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.decodeToken = void 0;
const jwt = require("jsonwebtoken");
const user_service_1 = require("./user.service");
const prisma_service_1 = require("./prisma.service");
const common_1 = require("@nestjs/common");
const AUTH_SECRET = process.env.AUTH_SECRET;
async function decodeToken(token) {
    const prismaService = new prisma_service_1.PrismaService();
    const userService = new user_service_1.UserService(prismaService);
    try {
        const payload = jwt.verify(token, AUTH_SECRET);
        const user = await userService.get({ id: payload.id });
        return user || null;
    }
    catch (e) {
        return null;
    }
}
exports.decodeToken = decodeToken;
exports.Authorization = (0, common_1.createParamDecorator)(async ({ sanitize } = { sanitize: true }, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { authorization: accessToken } = request.headers;
    try {
        const user = await decodeToken(accessToken);
        if (sanitize)
            delete user.password;
        return user;
    }
    catch (e) {
        return null;
    }
});
//# sourceMappingURL=auth.utilities.js.map
import { FullUser } from './user.service';
export declare function decodeToken(token: string): Promise<FullUser | null>;
export declare const Authorization: (...dataOrPipes: ({
    sanitize: boolean;
} | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;

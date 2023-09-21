import { PrismaService } from "./prisma.service";
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from "./user.dto";
export interface AdditionalUserFields {
    fullName: string;
}
export type PartialPick<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;
export type ExtendedUser = PartialPick<User, 'role' | 'password'> & AdditionalUserFields;
export type FullUser = User & AdditionalUserFields;
export type SanitizedUser = Omit<User, 'password' | 'role'>;
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getFullName(user: User): string;
    sanitize(user: User | null): PartialPick<User, 'role' | 'password'> | null;
    extend(user: User | null, sanitize?: boolean): ExtendedUser | null;
    get(where: Prisma.UserWhereUniqueInput, sanitize?: boolean): Promise<ExtendedUser | null>;
    getByEmail(email: string, sanitize?: boolean): Promise<ExtendedUser | null>;
    getAll(args?: {
        select?: Prisma.UserSelect;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;
        cursor?: Prisma.UserWhereUniqueInput;
        take?: number;
        skip?: number;
    }, sanitize?: boolean): Promise<ExtendedUser[]>;
    create(data: Omit<CreateUserDto, 'passwordRepeat'>): Promise<ExtendedUser>;
    delete(where: Prisma.UserWhereInput): Promise<boolean>;
}

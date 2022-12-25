// import { NextFunction, Request, Response } from 'express';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';

export interface IUsersService {
	create: (dto: UserRegisterDto) => Promise<UserModel | null>;

	validateUser: (dto: UserLoginDto) => Promise<UserModel | null>;
	getUserInfo: (email: string) => Promise<UserModel | null>;

	// register(req: Request, res: Response, next: NextFunction): void;
}

import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/loger.interface';
import { IUsersController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUsersService } from './users.service.interface';
import 'reflect-metadata';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { GuardMiddleware } from '../common/guard.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) protected logger: ILogger,
		@inject(TYPES.IUsersService) private usersService: IUsersService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new GuardMiddleware()],
			},
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.logger.log('Register');
		const result = await this.usersService.create(body);
		if (!result) {
			return next(new HttpError(422, 'Такой пользователь уже существует'));
		}
		// this.logger.log(req.body);
		this.ok(res, { email: result.email, id: result.id });
		next();
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.logger.log('Login');
		const result = await this.usersService.validateUser(body);
		if (!result) {
			return next(new HttpError(401, 'Ошибка авторизации', 'Login'));
		}
		const jwt = await this.signJWT(result.email, this.configService.get('JWT_SECRET'));
		this.ok(res, { email: result.email, id: result.id, jwt });
		return next();
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		// const jwt = await this.signJWT(result.email, this.configService.get('JWT_SECRET'));
		const currentUser = await this.usersService.getUserInfo(user);
		if (currentUser) {
			this.ok(res, { name: currentUser.name, email: currentUser.email, id: currentUser.id });
		} else {
			this.send(res, 403, 'Пользователь не найден');
		}
		return next();
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) reject(err);
					resolve(token as string);
				},
			);
		});
	}
}

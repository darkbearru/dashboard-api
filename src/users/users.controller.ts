import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/loger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) protected logger: ILogger) {
		super(logger);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.logger.log('Register');
		this.ok(res, 'Register');
		next();
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.logger.log('Login');
		// this.ok(res, 'Login');
		next(new HttpError(401, 'Ошибка авторизации', 'Login'));
	}
}

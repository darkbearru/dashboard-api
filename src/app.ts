import express, { Express } from 'express';
import { Server } from 'node:http';
import { UsersController } from './users/users.controller';
import { ILogger } from './logger/loger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import 'reflect-metadata';

@injectable()
export class App {
	private app: Express;
	private port = 8900;
	private server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUsersController) private usersController: UsersController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Сервер запущен на http://localhost:${this.port}/`);
		});
	}

	protected useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	protected useMiddleware(): void {
		this.app.use(express.json());
	}

	protected useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
}

import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/loger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUsersController } from './users/users.controller.interface';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IUsersController>(TYPES.IUsersController).to(UsersController).inSingletonScope();
	bind<IUsersService>(TYPES.IUsersService).to(UsersService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();

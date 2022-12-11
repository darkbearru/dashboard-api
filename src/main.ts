import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/loger.interface";
import {TYPES} from "./types";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {IUsersController} from "./users/users.controller.interface";

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
    bind<IUsersController>(TYPES.IUsersController).to(UsersController);
    bind<App>(TYPES.Application).to(App);
});

const bootstrap = () => {
    const appContainer = new Container();
    appContainer.load(appBinding);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return {app, appContainer}
}

export const {app, appContainer} = bootstrap();
import express, {Express} from "express";
import {Server} from "node:http";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";

export class App {
    private app: Express;
    private port: number = 8900;
    private server: Server;

    constructor(private logger: LoggerService, private usersController: UsersController, private exceptionFilter: ExceptionFilter) {
        this.app = express();
    }

    protected useRoutes() {
        this.app.use('/users', this.usersController.router);
    }

    protected useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init () {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Сервер запущен на http://localhost:${this.port}/`);
        })
    }
}
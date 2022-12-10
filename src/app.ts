import express, {Express} from "express";
import {Server} from "node:http";
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";

export class App {
    private app: Express;
    private port: number = 8900;
    private server: Server;

    constructor(private logger: LoggerService, private usersController: UsersController) {
        this.app = express();
    }
    protected useRoutes() {
        console.log(this.usersController.router);
        this.app.use('/users', this.usersController.router);
    }
    public async init () {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Сервер запущен на http://localhost:${this.port}/`);
        })
    }
}
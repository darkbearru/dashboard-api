import express, {Express} from "express";
import {userRouter} from "./users/users";
import {Server} from "node:http";
import {LoggerService} from "./logger/logger.service";

export class App {
    private app: Express;
    private port: number = 8900;
    private server: Server;

    constructor(private logger: LoggerService) {
        this.app = express();
    }
    public async init () {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Сервер запущен на http://localhost:${this.port}/`);
        })
    }
    public useRoutes() {
        this.app.use('/users', userRouter);
    }
}
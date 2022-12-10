import {BaseController} from "../common/base.controller";
import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger.service";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register },
        ])
    }

    private register(req: Request, res: Response, next: NextFunction) {
        this.logger.log('Register');
        this.ok(res, 'Register');
        next();
    }

    private login(req: Request, res: Response, next: NextFunction) {
        this.logger.log('Login');
        this.ok(res, 'Login');
        next();
    }
}
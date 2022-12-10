import express, {NextFunction, Request, Response} from 'express';

const userRouter = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
   next();
});

export {userRouter};
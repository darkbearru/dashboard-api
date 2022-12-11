import { Response } from 'express';

export interface IController {
	created: (res: Response) => Response;
	send: <T>(res: Response, code: number, message: T) => Response;
	ok: <T>(res: Response, message: T) => Response;
}

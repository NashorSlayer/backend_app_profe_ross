import { Injectable, Ip, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const day = new Date().getDay();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const message = `method: ${method} | path: ${originalUrl} | date[ day: ${day}, month ${month}, year ${year} ] | ip: ${req.ip}`;
        console.log(message);
        next();
    }
}

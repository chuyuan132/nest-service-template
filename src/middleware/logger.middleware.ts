import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const requestStart = Date.now();
    const { method, originalUrl, ip, httpVersion, headers } = req;
    const { statusCode } = res;
    res.on('finish', () => {
      const requestEnd = Date.now();
      const requestTime = requestEnd - requestStart;
      const userAgent = headers['user-agent'];
      const logFormat = `[${new Date().toLocaleString()}] [${method}] HTTP/${httpVersion} [${ip}] [${statusCode}] [${requestTime}ms] [${userAgent}]`;
      if (statusCode >= 500) {
        this.logger.error(logFormat, originalUrl);
      } else if (statusCode >= 400) {
        this.logger.warn(logFormat, originalUrl);
      } else {
        this.logger.error(logFormat, originalUrl);
      }
    });
    next();
  }
}

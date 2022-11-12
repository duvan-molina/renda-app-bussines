import { Injectable, NestMiddleware } from '@nestjs/common';
import e, { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/utils';

@Injectable()
export class LoginDashboardMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) return res.json({ message: 'No token provided' });

    await jwt.verify(token, SECRET_KEY, (err) => {
      if (err) {
        return res.json({ message: 'Token invalid' });
      } else {
        next();
      }
    });
  }
}

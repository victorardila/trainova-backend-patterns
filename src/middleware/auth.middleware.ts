import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.get('x-auth-token'); // Obtener el token desde los headers
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      (req as any).user = decoded; // Asegúrate de usar el typecasting aquí
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(400).json({ message: 'Invalid token.' });
    }
  }
}

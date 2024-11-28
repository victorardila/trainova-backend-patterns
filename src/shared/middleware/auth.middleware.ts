// src/shared/middleware/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/user.interface';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    // Aquí deberías verificar el token JWT y añadir el usuario a la solicitud
    // Si el token es válido, se añade `req.user`
    if (token) {
      req.user = { id: 1, roles: ['admin'] };
    }
    next();
  }
}

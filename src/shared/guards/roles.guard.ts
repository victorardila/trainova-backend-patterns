// src/shared/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, se permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica si el usuario tiene un rol permitido
    return requiredRoles.includes(user.role);
  }
}

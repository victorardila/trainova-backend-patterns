// src/shared/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../roles/role.enum'; // Asegúrate de tener un enum de roles

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;  // Si no se especifican roles, permite el acceso
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Verifica si el usuario tiene uno de los roles permitidos
    return roles.some(role => user.roles?.includes(role));
  }
}

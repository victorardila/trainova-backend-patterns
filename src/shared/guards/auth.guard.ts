import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Aquí suponemos que el usuario ya está adjunto al request, por ejemplo, por un middleware
    const user = request.user;
    // Si el usuario está autenticado (existe), permite la solicitud
    return !!user; // Si user es null o undefined, devuelve false
  }
}

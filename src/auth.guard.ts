import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const toBypassAuth = this.reflector.get<boolean>(
      'no-auth',
      context.getClass(),
    );
    if (toBypassAuth) return true;
    const request = context.switchToHttp().getRequest();
    if (!request.headers || !request.headers.authorization) return false;
    const bearer = request.headers.authorization.replace(/^bearer\s/i, '');
    if (!bearer) return false;
    console.log(bearer);
    if (!this.jwtService.verify(bearer)) return false;
    const user = this.jwtService.decode(bearer) as { id: string };
    request.user = { id: user.id };
    return true;
  }
}

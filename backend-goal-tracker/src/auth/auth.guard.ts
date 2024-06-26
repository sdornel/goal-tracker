import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
  
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.get('cookie')) {
        throw new UnauthorizedException('Please provide token');
      }
      const authorization: string = request.get('cookie');
      const authToken = authorization.replace(/Authentication=/gim, '');

      const user = await this.authService.validateToken(authToken);
      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = user;
      return true;
    } catch (error) {
      console.error('auth error -', error.message);
      throw new ForbiddenException(error.message || 'Session expired! Please sign in');
    }
  }
}
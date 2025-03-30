import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: { sub: string; email: string; role: string };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;

    console.log('authHeader', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      request.user = this.jwtService.verify<{
        sub: string;
        email: string;
        role: string;
      }>(token);
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

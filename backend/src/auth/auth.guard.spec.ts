import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      verify: jest.fn(),
    } as any;

    guard = new AuthGuard(jwtService);
  });

  const mockExecutionContext = (authHeader: string | undefined) => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: authHeader,
          },
        }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should return true and attach user to request if token is valid', () => {
    const mockUser = {
      sub: '123',
      email: 'user@example.com',
      role: 'user',
    };

    const token = 'valid.jwt.token';
    (jwtService.verify as jest.Mock).mockReturnValue(mockUser);

    const context = mockExecutionContext(`Bearer ${token}`);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(jwtService.verify).toHaveBeenCalledWith(token);
  });

  it('should throw if authorization header is missing', () => {
    const context = mockExecutionContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw if authorization header is malformed', () => {
    const context = mockExecutionContext('InvalidHeader');
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw if token verification fails', () => {
    const token = 'invalid.jwt.token';
    (jwtService.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const context = mockExecutionContext(`Bearer ${token}`);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(() => {
    prisma = mockPrisma as unknown as PrismaService;
    jwtService = mockJwtService as unknown as JwtService;
    authService = new AuthService(prisma, jwtService);

    // Clear mocks between tests
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.validateUser('test@example.com', 'password'),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.validateUser('test@example.com', 'wrongPassword'),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should return sanitized user if validation is successful', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        authService.login('test@example.com', 'password'),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should return access token and user on successful login', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await authService.login('test@example.com', 'password');
      expect(result).toEqual({
        accessToken: 'mockToken',
        user: { id: '1', email: 'test@example.com' },
      });
    });
  });

  describe('signup', () => {
    it('should throw ConflictException if user already exists', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        authService.signup({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrowError(ConflictException);
    });

    it('should return access token and user on successful signup', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockPrisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrisma.user.create.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await authService.signup({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual({
        accessToken: 'mockToken',
        user: { id: '1', email: 'test@example.com' },
      });
    });
  });
});

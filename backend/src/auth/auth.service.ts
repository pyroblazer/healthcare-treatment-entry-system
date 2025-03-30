// backend/src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { SignupDto } from './dto/signup.dto';

type SanitizedUser = {
  id: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<SanitizedUser> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, email: user.email };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: SanitizedUser }> {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ accessToken: string; user: SanitizedUser }> {
    const { email, password } = signupDto;

    // Check if a user already exists with the given email
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with that email already exists');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const sanitizedUser: SanitizedUser = { id: user.id, email: user.email };
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      user: sanitizedUser,
    };
  }
}

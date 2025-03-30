import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.login(email, password);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }
}

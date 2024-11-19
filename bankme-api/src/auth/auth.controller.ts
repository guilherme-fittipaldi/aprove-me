import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: { login: string; password: string }) {
    const { login, password } = body;
    return this.authService.login(login, password);
  }

  @Post('refresh')
  refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    const payload = this.authService.verifyRefreshToken(refreshToken);

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newTokens = this.authService.generateTokens(payload.login);
    return newTokens;
  }
}

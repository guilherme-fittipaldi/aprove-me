import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: { login: string; password: string }) {
    if (!body.login || !body.password) {
      throw new UnauthorizedException('Credenciais são obrigatórias');
    }
    return this.authService.login(body.login, body.password);
  }
}

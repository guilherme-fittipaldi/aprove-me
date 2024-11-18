import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('integrations/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(
    @Body() body: { login: string; password: string }
  ) {
    const { login, password } = body;
    if (!login || !password) throw new BadRequestException('Login or password missing');

    return this.userService.createUser(login, password);
  }
}

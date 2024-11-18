import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Adicione esta linha
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'aprovame_secret',
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule], // Exporta o PassportModule para uso em outros módulos
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './module/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey', // lưu ở env file thật
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

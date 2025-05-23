import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(data: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.usersService.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token); // nếu hết hạn sẽ throw
      const newAccessToken = this.jwtService.sign(
        { username: payload.username, sub: payload.sub },
        { expiresIn: '15m' },
      );
      return { access_token: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
  async verifyAccessToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return { valid: true, payload };
    } catch (err) {
      return { valid: false, message: err.message };
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validateA(num_tel: string, password: string): Promise<any> {
    const user = await this.authService.validateUserA(num_tel, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateC(num_tel: string, password: string): Promise<any> {
    const user = await this.authService.validateUserC(num_tel, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateO(num_tel: string, password: string): Promise<any> {
    const user = await this.authService.validateUserO(num_tel, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientModule } from 'src/client/client.module';
import { OuvrierModule } from 'src/ouvrier/ouvrier.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserInterceptor } from './user.interceptor';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';

export const jwtConstants = {
  secret: 'g§ueve45u§eyvZeicne',
};

@Module({
  imports: [
    AdminModule,
    ClientModule,
    OuvrierModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 * 8 + 's' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CurrentUserInterceptor],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

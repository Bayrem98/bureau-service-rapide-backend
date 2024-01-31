import {
  Controller,
  Get,
  UseInterceptors,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Client } from 'src/client/client.interface';
import { Ouvrier } from 'src/ouvrier/ouvrier.interface';
import CreateClientDto from 'src/client/dto/create-client.dto';
import CreateOuvrierDto from 'src/ouvrier/dto/create-ouvrier.dto';
import { LoginCAuthDto } from './dto/loginC-auth.dto';
import { LoginOAuthDto } from './dto/loginO-auth.dto';
import { CurrentUserInterceptor } from './user.interceptor';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async me(@Request() req): Promise<Client | undefined> {
    console.log(req.user);
    return this.authService.getMeC(req.user);
  }

  @Get('mea')
  async mea(@Request() req): Promise<Ouvrier | undefined> {
    console.log(req.user);
    return this.authService.getMeO(req.user);
  }

  @Post('register')
  async registerC(@Body() newClient: CreateClientDto): Promise<Client> {
    return this.authService.registerC(newClient);
  }

  @Post('registera')
  async registerO(@Body() newOuvrier: CreateOuvrierDto): Promise<Ouvrier> {
    return this.authService.registerO(newOuvrier);
  }

  @Post('login')
  async loginC(@Body() loginDto: LoginCAuthDto) {
    return this.authService.loginC(loginDto);
  }

  @Post('logina')
  async loginO(@Body() loginADto: LoginOAuthDto) {
    return this.authService.loginO(loginADto);
  }
}

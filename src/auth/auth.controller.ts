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
import { Admin } from 'src/admin/admin.interface';
import CreateAdminDto from 'src/admin/dto/create-admin.dto';
import { LoginAdAuthDto } from './dto/loginA-auth.dto';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('meadmin')
  async mesup(@Request() req): Promise<Admin | undefined> {
    console.log(req.user);
    return this.authService.getMeA(req.user);
  }

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

  @Post('registeradmin')
  async registeradmin(@Body() newadmin: CreateAdminDto): Promise<Admin> {
    return this.authService.registeradmin(newadmin);
  }

  @Post('register')
  async registerC(@Body() newClient: CreateClientDto): Promise<Client> {
    return this.authService.registerC(newClient);
  }

  @Post('registera')
  async registerO(@Body() newOuvrier: CreateOuvrierDto): Promise<Ouvrier> {
    return this.authService.registerO(newOuvrier);
  }

  @Post('loginadmin')
  async loginadmin(@Body() loginDto: LoginAdAuthDto) {
    return this.authService.loginadmin(loginDto);
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

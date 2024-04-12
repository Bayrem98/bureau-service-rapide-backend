import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { OuvrierService } from 'src/ouvrier/ouvrier.service';
import * as bcrypt from 'bcrypt';
import CreateClientDto from 'src/client/dto/create-client.dto';
import CreateOuvrierDto from 'src/ouvrier/dto/create-ouvrier.dto';
import { LoginCAuthDto } from './dto/loginC-auth.dto';
import { LoginOAuthDto } from './dto/loginO-auth.dto';
import { AdminService } from 'src/admin/admin.service';
import CreateAdminDto from 'src/admin/dto/create-admin.dto';
import { LoginAdAuthDto } from './dto/loginA-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private clientService: ClientService,
    private ouvrierService: OuvrierService,
    private jwtService: JwtService,
  ) {}

  async getMeA(admin: any) {
    console.log(admin);
    if (admin) return this.adminService.findOne(admin);
    else new HttpException('I dont know you!', HttpStatus.NOT_FOUND);
  }

  async getMeC(client: any) {
    console.log(client);
    if (client) return this.clientService.findOne(client);
    else new HttpException('I dont know you!', HttpStatus.NOT_FOUND);
  }

  async getMeO(ouvrier: any) {
    console.log(ouvrier);
    if (ouvrier) return this.ouvrierService.findOne(ouvrier);
    else new HttpException('I dont know you!', HttpStatus.NOT_FOUND);
  }

  async validateUserA(num_tel: string, pass: string): Promise<any> {
    const user = await this.adminService.findOneByUsername(num_tel);
    const isPassMatching = await bcrypt.compare(pass, user.password);
    if (user && !isPassMatching) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }

  public async validateUserC(num_tel: string, pass: string): Promise<any> {
    const user = await this.clientService.findOneByUsername(num_tel);

    if (user && user.password === pass) {
      user.password = undefined;
      return user;
    }

    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }

  async validateUserO(num_tel: string, pass: string): Promise<any> {
    const user = await this.ouvrierService.findOneByUsername(num_tel);
    const isPassMatching = await bcrypt.compare(pass, user.password);
    if (user && !isPassMatching) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }

  public async registeradmin(registrationData: CreateAdminDto) {
    const user = await this.adminService.findOneByUsername(
      registrationData.num_tel,
    );
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.adminService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async registerC(registrationData: CreateClientDto) {
    const user = await this.clientService.findOneByUsername(
      registrationData.num_tel,
    );
    if (user) {
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    }

    try {
      const createdUser = await this.clientService.create(registrationData);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async registerO(registrationData: CreateOuvrierDto) {
    const user = await this.ouvrierService.findOneByUsername(
      registrationData.num_tel,
    );
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.ouvrierService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginadmin(loginDto: LoginAdAuthDto) {
    const { password, num_tel } = loginDto;
    const found = await this.adminService.findOneByUsername(num_tel);
    if (!found) {
      throw new UnauthorizedException('Numéro de téléphone est incorrect !');
    }

    console.log(await bcrypt.compare(password, found.password));

    if (found && (await bcrypt.compare(password, found.password))) {
      return {
        token: this.jwtService.sign({ num_tel: num_tel }),
        user: found,
      };
    } else {
      console.log('mot de passe errone');
      throw new ConflictException(`Votre mot de passe est incorrect !`);
    }
  }

  public async loginC(loginDto: LoginCAuthDto) {
    const { password, num_tel } = loginDto;
    const found = await this.clientService.findOneByUsername(num_tel);

    if (!found) {
      throw new UnauthorizedException('Numéro de téléphone est incorrect !');
    }

    if (found.password === password) {
      return {
        token: this.jwtService.sign({ num_tel: num_tel }),
        user: found,
      };
    } else {
      throw new UnauthorizedException(`Votre mot de passe est incorrect !`);
    }
  }

  async loginO(loginDto: LoginOAuthDto) {
    const { password, num_tel } = loginDto;
    const found = await this.ouvrierService.findOneByUsername(num_tel);
    if (!found) {
      throw new UnauthorizedException('Numéro de téléphone est incorrect !');
    }

    console.log(await bcrypt.compare(password, found.password));

    if (found && (await bcrypt.compare(password, found.password))) {
      return {
        token: this.jwtService.sign({ num_tel: num_tel }),
        user: found,
      };
    } else {
      console.log('mot de passe errone');
      throw new ConflictException(`Votre mot de passe est incorrect !`);
    }
  }
}

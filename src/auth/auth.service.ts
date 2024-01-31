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

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private ouvrierService: OuvrierService,
    private jwtService: JwtService,
  ) {}

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

  async validateUserC(nom: string, pass: string): Promise<any> {
    const user = await this.clientService.findOneByUsername(nom);
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

  async validateUserO(nom: string, pass: string): Promise<any> {
    const user = await this.ouvrierService.findOneByUsername(nom);
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

  public async registerC(registrationData: CreateClientDto) {
    const user = await this.clientService.findOneByUsername(
      registrationData.nom,
    );
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.clientService.create({
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

  public async registerO(registrationData: CreateOuvrierDto) {
    const user = await this.ouvrierService.findOneByUsername(
      registrationData.nom,
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

  async loginC(loginDto: LoginCAuthDto) {
    const { password, nom } = loginDto;
    const found = await this.clientService.findOneByUsername(nom);
    if (!found) {
      throw new UnauthorizedException("Nom d'utilisateur est incorrect !");
    }

    console.log(await bcrypt.compare(password, found.password));

    if (found && (await bcrypt.compare(password, found.password))) {
      return {
        token: this.jwtService.sign({ nom: nom }),
        user: found,
      };
    } else {
      console.log('mot de passe errone');
      throw new ConflictException(`Votre mot de passe est incorrect !`);
    }
  }

  async loginO(loginDto: LoginOAuthDto) {
    const { password, nom } = loginDto;
    const found = await this.ouvrierService.findOneByUsername(nom);
    if (!found) {
      throw new UnauthorizedException("Nom d'utilisateur est incorrect !");
    }

    console.log(await bcrypt.compare(password, found.password));

    if (found && (await bcrypt.compare(password, found.password))) {
      return {
        token: this.jwtService.sign({ nom: nom }),
        user: found,
      };
    } else {
      console.log('mot de passe errone');
      throw new ConflictException(`Votre mot de passe est incorrect !`);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client-schema';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}

  async findOne(_id: string): Promise<Client> {
    return await this.clientModel.findOne({ _id }).select('-password').exec();
  }

  async findOneByUsername(nom: string): Promise<Client> {
    return this.clientModel.findOne({ nom }).exec();
  }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find().select('-password').exec();
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const user = await this.findOneByUsername(createClientDto.nom);
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const createdUser = new this.clientModel(createClientDto);
    createdUser.password = await bcrypt.hash(createdUser.password, 10);
    return createdUser.save();
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise</*UpdateResult*/ any> {
    if (updateClientDto.password)
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        10,
      );
    return this.clientModel.updateOne({ _id: id }, updateClientDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.clientModel.deleteOne({ _id: id });
  }
}

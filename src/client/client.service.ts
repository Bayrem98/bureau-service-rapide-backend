import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client-schema';
import CreateClientDto from './dto/create-client.dto';
import UpdateClientDto from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}

  async findOne(_id: string): Promise<Client> {
    return await this.clientModel.findOne({ _id }).exec();
  }

  async findOneByUsername(num_tel: string): Promise<Client> {
    return this.clientModel.findOne({ num_tel }).exec();
  }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find().exec();
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const user = await this.findOneByUsername(createClientDto.num_tel);
    if (user) {
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.clientModel(createClientDto);
    return createdUser.save();
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise</*UpdateResult*/ any> {
    return this.clientModel.updateOne({ _id: id }, updateClientDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.clientModel.deleteOne({ _id: id });
  }
}

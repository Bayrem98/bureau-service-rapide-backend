import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ouvrier, OuvrierDocuemnt } from './schemas/ouvrier-schema';
import { Model } from 'mongoose';
import CreateOuvrierDto from './dto/create-ouvrier.dto';
import { UpdateOuvrierDto } from './dto/update-ouvrier.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OuvrierService {
  async search(profession: string) {
    return this.ouvrierModel.find({ profession }).exec();
  }
  constructor(
    @InjectModel(Ouvrier.name)
    private ouvrierModel: Model<OuvrierDocuemnt>,
  ) {}

  async findOne(_id: string): Promise<Ouvrier> {
    return await this.ouvrierModel.findOne({ _id }).select('-password').exec();
  }

  async findOneByUsername(num_tel: string): Promise<Ouvrier> {
    return this.ouvrierModel.findOne({ num_tel }).exec();
  }

  async findAll(): Promise<Ouvrier[]> {
    return await this.ouvrierModel.find().select('-password').exec();
  }

  async create(createOuvrierDto: CreateOuvrierDto): Promise<Ouvrier> {
    const user = await this.findOneByUsername(createOuvrierDto.num_tel);
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const createdUser = new this.ouvrierModel(createOuvrierDto);
    createdUser.password = await bcrypt.hash(createdUser.password, 10);
    return createdUser.save();
  }

  async update(
    id: string,
    updateOuvrierDto: UpdateOuvrierDto,
  ): Promise</*UpdateResult*/ any> {
    if (updateOuvrierDto.password)
      updateOuvrierDto.password = await bcrypt.hash(
        updateOuvrierDto.password,
        10,
      );
    return this.ouvrierModel.updateOne({ _id: id }, updateOuvrierDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.ouvrierModel.deleteOne({ _id: id });
  }
}

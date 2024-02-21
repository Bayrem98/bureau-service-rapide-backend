import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact-schema';
import CreateContactDto from './dto/create-contact.dto';
import UpdateContactDto from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
  ) {}

  async findOne(_id: string): Promise<Contact> {
    return await this.contactModel.findOne({ _id }).select('-password').exec();
  }

  async findOneByUsername(num_tel: string): Promise<Contact> {
    return this.contactModel.findOne({ num_tel }).exec();
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactModel.find().select('-password').exec();
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const user = await this.findOneByUsername(createContactDto.num_tel);
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const createdUser = new this.contactModel(createContactDto);
    createdUser.num_tel = await createdUser.num_tel;
    return createdUser.save();
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise</*UpdateResult*/ any> {
    if (updateContactDto.num_tel) updateContactDto.num_tel;
    return this.contactModel.updateOne({ _id: id }, updateContactDto);
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.contactModel.deleteOne({ _id: id });
  }
}

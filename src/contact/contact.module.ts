import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactSchema } from './schemas/contact-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactService } from './contact.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}

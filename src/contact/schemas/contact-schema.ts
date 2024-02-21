import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true, type: String })
  nom: string;
  @Prop({ required: true, type: String })
  prenom: string;
  @Prop({ required: true, type: String })
  num_tel: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OuvrierDocuemnt = Ouvrier & Document;

@Schema()
export class Ouvrier {
  @Prop({ required: true, type: String })
  nom: string;
  @Prop({ required: true, type: String })
  prenom: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ type: Number })
  num_cin?: number;
  @Prop({ required: true, type: String })
  num_tel: string;
  @Prop({ required: true, type: String })
  adresse: string;
  @Prop({ required: true, type: String })
  profession: string;
}

export const OuvrierSchema = SchemaFactory.createForClass(Ouvrier);

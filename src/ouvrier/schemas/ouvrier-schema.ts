import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Reclamation } from 'src/reclamation/schemas/reclamation.schema';

export type OuvrierDocuemnt = Ouvrier & Document;

@Schema()
export class Ouvrier {
  @Prop({ required: true, type: String })
  nom: string;
  @Prop({ required: true, type: String })
  prenom: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ type: String })
  num_cin?: string;
  @Prop({ required: true, type: String })
  num_tel: string;
  @Prop({ required: true, type: String })
  adresse: string;
  @Prop({ required: true, type: String })
  profession: string;
  @Prop({ type: String })
  coverPath?: string;
  @Prop({ type: Number })
  avis?: number;
  @Prop({ type: String })
  description?: string;
  @Prop({ type: Types.ObjectId, ref: 'Reclamation' })
  reclamation?: Reclamation[];
}

export const OuvrierSchema = SchemaFactory.createForClass(Ouvrier);

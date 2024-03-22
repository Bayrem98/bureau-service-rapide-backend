import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true, type: String })
  nom: string;
  @Prop({ required: true, type: String })
  prenom: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ required: true, type: String })
  num_tel: string;
  @Prop({ required: true, type: String })
  adresse: string;
  @Prop({ type: String })
  description?: string;
  @Prop({ type: String })
  coverPath?: string;
  @Prop({ type: String })
  num_cin?: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

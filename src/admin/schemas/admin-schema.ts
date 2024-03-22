import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ required: true, type: String })
  num_tel: string;

  @Prop({ required: true, type: String })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

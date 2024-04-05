import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReclamationDocument = Reclamation & Document;

@Schema()
export class Reclamation {
  @Prop({ type: String })
  _id?: string;
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  name_client: string;
  @Prop({ type: String })
  reclam: string;
}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);

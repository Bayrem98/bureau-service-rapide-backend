import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReclamationSchema } from './schemas/reclamation.schema';
import { ReclamationService } from './reclamation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reclamation', schema: ReclamationSchema },
    ]),
  ],
  providers: [ReclamationService],
  exports: [ReclamationService],
})
export class ReclamationModule {}

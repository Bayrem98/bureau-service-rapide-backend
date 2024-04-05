import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OuvrierSchema } from './schemas/ouvrier-schema';
import { OuvrierController } from './ouvrier.controller';
import { OuvrierService } from './ouvrier.service';
import { ReclamationModule } from 'src/reclamation/reclamation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ouvrier', schema: OuvrierSchema }]),
    ReclamationModule,
  ],
  controllers: [OuvrierController],
  providers: [OuvrierService],
  exports: [OuvrierService],
})
export class OuvrierModule {}

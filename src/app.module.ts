import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { OuvrierModule } from './ouvrier/ouvrier.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';
import { ContactModule } from './contact/contact.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ReclamationService } from './reclamation/reclamation.service';
import { ReclamationController } from './reclamation/reclamation.controller';
import { ReclamationModule } from './reclamation/reclamation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.gjbdf3j.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
    ),
    ClientModule,
    OuvrierModule,
    AuthModule,
    AdminModule,
    UploadModule,
    ContactModule,
    CloudinaryModule,
    ReclamationModule,
  ],
  controllers: [AppController, ReclamationController],
  providers: [AppService, ReclamationService],
})
export class AppModule {}

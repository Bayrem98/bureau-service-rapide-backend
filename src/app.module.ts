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
import { ContactService } from './contact/contact.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/bureau-service-rapide`),
    ClientModule,
    OuvrierModule,
    AuthModule,
    AdminModule,
    UploadModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService, ContactService],
})
export class AppModule {}

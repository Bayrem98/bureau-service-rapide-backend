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

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://mongobayrem:bayrembayrem@cluster0.gjbdf3j.mongodb.net/bureau-service-rapide?retryWrites=true&w=majority`,
    ),
    ClientModule,
    OuvrierModule,
    AuthModule,
    AdminModule,
    UploadModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

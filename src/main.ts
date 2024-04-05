import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  //  const limiter = rateLimit({
  //   windowMs: 5 * 60 * 100,
  //   limit: 10,
  //   standardHeaders: true,
  //   legacyHeadres: false,
  // });
  // app.use(limiter);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

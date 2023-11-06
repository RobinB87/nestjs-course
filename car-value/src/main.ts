import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip 'additiona' properties which are not in dto, so users cannot add additional properties
    }),
  );
  await app.listen(3000);
}
bootstrap();

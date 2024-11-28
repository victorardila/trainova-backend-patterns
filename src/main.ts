/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './shared/middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(AuthMiddleware);  // Aplica el middleware globalmente
  await app.listen(3000);
}
bootstrap();

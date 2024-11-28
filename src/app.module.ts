/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './modules/course/course.module';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CourseModule,
    UserModule, // Asegúrate de que el módulo de usuario esté aquí
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/users') // Excluye la ruta /login del middleware
      .exclude('/') // Excluye la ruta /login del middleware
      .forRoutes('*'); // Aplica el middleware a todas las demás rutas
  }
}

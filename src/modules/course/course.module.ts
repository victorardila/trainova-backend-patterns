import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './course.service';
import { CoursesController } from './course.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware'; // Asegúrate de que la ruta es correcta
import { CourseSchema } from './schemas/course.schema';
import { ContentModule } from 'src/modules/content/content.module';
import { ContentSchema } from 'src/modules/content/schema/content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Content', schema: ContentSchema },
    ]),
    ContentModule,
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CoursesController); // Aplica el middleware a las rutas del controlador de cursos
  }
}

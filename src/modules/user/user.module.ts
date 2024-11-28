import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Importa el esquema de User
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Asegúrate de tener esta variable en tu .env
      signOptions: { expiresIn: '1h' }, // Tiempo de expiración del token
    }),
  ],
  providers: [UserService], // Inyecta el servicio que manejará la lógica de usuarios
  controllers: [UsersController], // Expondrá las rutas para interactuar con el módulo de usuarios
})
export class UserModule {}

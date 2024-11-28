import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Importa el esquema de User
  ],
  providers: [UsersService], // Inyecta el servicio que manejará la lógica de usuarios
  controllers: [UsersController], // Expondrá las rutas para interactuar con el módulo de usuarios
})
export class UserModule {}

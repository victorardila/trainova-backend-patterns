import { User } from '../../modules/user/interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Ajusta `User` según tu definición de usuario
    }
  }
}

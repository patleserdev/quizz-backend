// types/express.d.ts
import { Users } from '../users/entities/user.entity'; // adapte selon ton projet

declare module 'express' {
  interface Request {
    user?: Users; // ou un type spécifique que tu utilises pour req.user
  }
}

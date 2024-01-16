import { expressjwt } from "express-jwt";

export const authMiddleware = expressjwt({
  secret: 'your-secret-key',
  algorithms: ['HS256']
});
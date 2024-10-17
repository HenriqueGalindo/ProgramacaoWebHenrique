import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtSecretKey = "Chave secreta";

export interface AuthenticatedRequest extends Request {
  usuario?: JwtPayload;
}

export function autenticarToken() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      const tokenValido = jwt.verify(token, jwtSecretKey) as JwtPayload;
      req.usuario = tokenValido; 
      next();
      
    } catch (err) {
      console.log(err);
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
  };
}
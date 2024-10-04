import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { Usuario } from '../entities/Usuario';

interface CustomRequest extends Request {
  usuario?: any; // Puedes definir un tipo más específico si conoces la estructura de `usuario`
}

export const verificarToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  // Obtenemos el token del encabezado Authorization
  const authHeader = req.headers['authorization'];

  // Si no hay token proporcionado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensaje: 'Token no proporcionado o incorrecto' });
    return; // Asegúrate de detener la ejecución
  }

  // Extraemos el token (removiendo la palabra "Bearer")
  const token = authHeader.split(' ')[1];

  // Verificamos el token
  jwt.verify(token, process.env.JWT_SECRET || 'chris12', async (err: any, decoded: any) => {
    if (err) {
      // Si hay algún error al verificar el token (ej: token expirado o inválido)
      res.status(401).json({ mensaje: 'Token rechazado' });
      return;
    }

    // Intentamos obtener el usuario con el ID del token decodificado
    const usuario = await AppDataSource.getRepository(Usuario).findOne({ where: { id: decoded.id } });

    // Verificamos si el usuario existe y está activo
    if (!usuario || usuario.estado !== "Activo") {
      res.status(401).json({ mensaje: 'Usuario no encontrado o inactivo' });
      return;
    }

    // Si todo está bien, almacenamos los datos del usuario en la request
    req.usuario = decoded;
    next();
  });
};
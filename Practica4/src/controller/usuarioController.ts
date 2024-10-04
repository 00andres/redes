import { Request, Response } from 'express';
import { AppDataSource } from '../config/database'; // Importa tu fuente de datos
import { Usuario } from '../entities/Usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrar un nuevo usuario
export const registrarUsuario = async (req: Request, res: Response) => {
    const { nombre, clave } = req.body;

    if (!nombre || !clave) {
        return res.status(400).json({ mensaje: 'Nombre y clave son obligatorios' });
    }

    try {
        const usuarioRepository = AppDataSource.getRepository(Usuario); // Cambiado a AppDataSource
        const usuarioExistente = await usuarioRepository.findOne({ where: { nombre } });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        const claveHasheada = await bcrypt.hash(clave, 10);
        const nuevoUsuario = usuarioRepository.create({ nombre, clave: claveHasheada, estado: 'Activo' });
        await usuarioRepository.save(nuevoUsuario);

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error: unknown) {
        console.error('Error al registrar usuario:', error);

        if (error instanceof Error) {
            res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
        } else {
            res.status(500).json({ mensaje: 'Error al registrar usuario', error: 'Error desconocido' });
        }
    }
};

// Iniciar sesión
export const iniciarSesion = async (req: Request, res: Response) => {
    const { nombre, clave } = req.body;

    try {
        const usuarioRepository = AppDataSource.getRepository(Usuario); // Cambiado a AppDataSource
        const usuario = await usuarioRepository.findOne({ where: { nombre } });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const esClaveValida = await bcrypt.compare(clave, usuario.clave);
        if (!esClaveValida) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET || 'chris12', { expiresIn: '1h' });
        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error: unknown) {
        console.error('Error al iniciar sesión:', error);

        if (error instanceof Error) {
            res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
        } else {
            res.status(500).json({ mensaje: 'Error al iniciar sesión', error: 'Error desconocido' });
        }
    }
};

import { Router} from 'express';
import { registrarUsuario, iniciarSesion } from '../controller/usuarioController';

const router = Router();

// Ruta para registrar un usuario
router.post('/registro', async (req, res) => {
    try {
        await registrarUsuario(req, res);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        await iniciarSesion(req, res);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
});

export default router;

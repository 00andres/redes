import express, { Request, Response, NextFunction } from 'express';
import { verificarToken } from './middleware/authMiddleware';
import usuarioRoutes from './routes/usuarioRoutes';
import 'reflect-metadata';
const app = express();

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

// Ruta protegida que utiliza el middleware verificarToken
app.use('/api/protegida', verificarToken, (req: Request & { usuario?: any }, res: Response) => {
    res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
});


// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Algo salió mal' });
});

export default app;

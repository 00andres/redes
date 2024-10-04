import 'reflect-metadata';
import { AppDataSource } from './config/database'; // Asegúrate de que la ruta es correcta
import app from './app';
import { Usuario } from './entities/Usuario';

const PORT = process.env.PORT || 3700;

AppDataSource.initialize()
    .then(() => {
        console.log('Conexión a la base de datos establecida.');

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });
    // Crea un usuario de prueba
    const usuario = new Usuario();

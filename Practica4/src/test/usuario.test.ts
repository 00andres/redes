import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../config/database';

beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.synchronize(true); // Sincroniza la base de datos en modo de prueba
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe('Pruebas de inicio de sesión de usuario', () => {
    const usuarioData = {
        nombre: 'alex',
        clave: 'clave'
    };

    it('Debe iniciar sesión con un usuario registrado y acceder a una ruta protegida', async () => {
        // Primero, registramos el usuario para asegurarnos de que existe
        await request(app)
            .post('/api/usuarios/registro')
            .send(usuarioData);

        // Luego, intentamos iniciar sesión con el usuario registrado
        const loginResponse = await request(app)
            .post('/api/usuarios/login')
            .send(usuarioData);
        
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.mensaje).toBe('Inicio de sesión exitoso');
        expect(loginResponse.body.token).toBeDefined();

        const token = loginResponse.body.token;

        // Intentamos acceder a una ruta protegida usando el token
        const protectedResponse = await request(app)
            .get('/api/protegida') // Cambia esto a la ruta protegida que deseas probar
            .set('Authorization', `Bearer ${token}`);
        
        expect(protectedResponse.status).toBe(200);
        expect(protectedResponse.body.mensaje).toBe('Ruta protegida'); // Ajusta esto según la respuesta esperada
    });
});
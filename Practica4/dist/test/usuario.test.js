"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const database_1 = require("../config/database");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.AppDataSource.initialize();
    yield database_1.AppDataSource.synchronize(true); // Sincroniza la base de datos en modo de prueba
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.AppDataSource.destroy();
}));
describe('Pruebas de inicio de sesión de usuario', () => {
    const usuarioData = {
        nombre: 'alex',
        clave: 'clave'
    };
    it('Debe iniciar sesión con un usuario registrado y acceder a una ruta protegida', () => __awaiter(void 0, void 0, void 0, function* () {
        // Primero, registramos el usuario para asegurarnos de que existe
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/usuarios/registro')
            .send(usuarioData);
        // Luego, intentamos iniciar sesión con el usuario registrado
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/api/usuarios/login')
            .send(usuarioData);
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.mensaje).toBe('Inicio de sesión exitoso');
        expect(loginResponse.body.token).toBeDefined();
        const token = loginResponse.body.token;
        // Intentamos acceder a una ruta protegida usando el token
        const protectedResponse = yield (0, supertest_1.default)(app_1.default)
            .get('/api/protegida') // Cambia esto a la ruta protegida que deseas probar
            .set('Authorization', `Bearer ${token}`);
        expect(protectedResponse.status).toBe(200);
        expect(protectedResponse.body.mensaje).toBe('Ruta protegida'); // Ajusta esto según la respuesta esperada
    }));
});

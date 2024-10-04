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
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const Usuario_1 = require("../entities/Usuario");
const verificarToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'chris12', (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            // Si hay algún error al verificar el token (ej: token expirado o inválido)
            res.status(401).json({ mensaje: 'Token rechazado' });
            return;
        }
        // Intentamos obtener el usuario con el ID del token decodificado
        const usuario = yield database_1.AppDataSource.getRepository(Usuario_1.Usuario).findOne({ where: { id: decoded.id } });
        // Verificamos si el usuario existe y está activo
        if (!usuario || usuario.estado !== "Activo") {
            res.status(401).json({ mensaje: 'Usuario no encontrado o inactivo' });
            return;
        }
        // Si todo está bien, almacenamos los datos del usuario en la request
        req.usuario = decoded;
        next();
    }));
});
exports.verificarToken = verificarToken;

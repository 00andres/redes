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
exports.iniciarSesion = exports.registrarUsuario = void 0;
const database_1 = require("../config/database"); // Importa tu fuente de datos
const Usuario_1 = require("../entities/Usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registrar un nuevo usuario
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, clave } = req.body;
    if (!nombre || !clave) {
        return res.status(400).json({ mensaje: 'Nombre y clave son obligatorios' });
    }
    try {
        const usuarioRepository = database_1.AppDataSource.getRepository(Usuario_1.Usuario); // Cambiado a AppDataSource
        const usuarioExistente = yield usuarioRepository.findOne({ where: { nombre } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }
        const claveHasheada = yield bcrypt_1.default.hash(clave, 10);
        const nuevoUsuario = usuarioRepository.create({ nombre, clave: claveHasheada, estado: 'Activo' });
        yield usuarioRepository.save(nuevoUsuario);
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        if (error instanceof Error) {
            res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
        }
        else {
            res.status(500).json({ mensaje: 'Error al registrar usuario', error: 'Error desconocido' });
        }
    }
});
exports.registrarUsuario = registrarUsuario;
// Iniciar sesión
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, clave } = req.body;
    try {
        const usuarioRepository = database_1.AppDataSource.getRepository(Usuario_1.Usuario); // Cambiado a AppDataSource
        const usuario = yield usuarioRepository.findOne({ where: { nombre } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const esClaveValida = yield bcrypt_1.default.compare(clave, usuario.clave);
        if (!esClaveValida) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET || 'chris12', { expiresIn: '1h' });
        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        if (error instanceof Error) {
            res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
        }
        else {
            res.status(500).json({ mensaje: 'Error al iniciar sesión', error: 'Error desconocido' });
        }
    }
});
exports.iniciarSesion = iniciarSesion;

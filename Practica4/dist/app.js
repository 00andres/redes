"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
require("reflect-metadata");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/usuarios', usuarioRoutes_1.default);
// Ruta protegida que utiliza el middleware verificarToken
app.use('/api/protegida', authMiddleware_1.verificarToken, (req, res) => {
    res.json({ mensaje: 'Ruta protegida', usuario: req.usuario });
});
// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Algo salió mal' });
});
exports.default = app;

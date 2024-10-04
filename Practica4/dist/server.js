"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = require("./config/database"); // Asegúrate de que la ruta es correcta
const app_1 = __importDefault(require("./app"));
const Usuario_1 = require("./entities/Usuario");
const PORT = process.env.PORT || 3700;
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Conexión a la base de datos establecida.');
    app_1.default.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});
// Crea un usuario de prueba
const usuario = new Usuario_1.Usuario();

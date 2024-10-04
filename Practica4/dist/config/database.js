"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../entities/Usuario");
;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "practica3",
    entities: [Usuario_1.Usuario],
    synchronize: true,
    logging: false,
});

import { DataSource } from 'typeorm';
import { Usuario } from '../entities/Usuario';
;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "", // Cambia esto por tu contraseña real
    database: "practica3", // Cambia esto por el nombre de tu base de datos
    entities: [Usuario],
    synchronize: true,
    logging: false,
});

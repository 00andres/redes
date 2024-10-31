import "reflect-metadata";
import { DataSource } from "typeorm";
import { torneo } from "./entity/torneo";
import { equipo } from "./entity/equipo";
import { User } from "./entity/User";
import { Partido } from "./entity/partido";
import { Transaccion } from "./entity/transaccion";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "practica5",
    synchronize: true,
    logging: false,
    entities: [equipo, torneo, User, Partido, Transaccion],
    migrations: [],
    subscribers: [],
});

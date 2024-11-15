import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Torneo } from "./entity/Torneo";
import { Equipo } from "./entity/Equipo";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "practica6",
    synchronize: true,
    logging: false,
    entities: [User, Torneo, Equipo],
    migrations: [],
    subscribers: [],
});

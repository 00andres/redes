import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { equipo } from "./entity/equipo"
import { torneo } from "./entity/torneo"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "practica3",
    synchronize: true,
    logging: false,
    entities: [User,equipo,torneo],
    migrations: [],
    subscribers: [],
})

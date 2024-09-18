import "reflect-metadata"
import { DataSource } from "typeorm"

import { IDequipo } from "./entity/equipo"
import { IDtorneo } from "./entity/torneo"
import { IDpartido } from "./entity/partido"


  
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "test",
    database: "practica",
    synchronize: true,
    logging: false,
    entities: [IDequipo,IDpartido,IDtorneo],
    migrations: [],
    subscribers: [],
})

import "reflect-metadata"
import { DataSource } from "typeorm"
import { equipos } from "./entity/equipos" 
import { jugador } from "./entity/jugador"
import { torneo } from "./entity/torneo" 
import { entorno } from "./entity/entorno"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "examen",
    synchronize: true,
    logging: false,
    entities: [equipos, jugador, torneo, entorno],
    migrations: [],
    subscribers: [],
})

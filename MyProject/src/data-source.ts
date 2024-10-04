import "reflect-metadata"
import { DataSource } from "typeorm"
import { torneo } from "./entity/torneo"
import { equipo } from "./entity/equipo"
import { User } from "./entity/User"


  
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "practica3",
    synchronize: true,
    logging: false,
    entities: [equipo,torneo,User],
    migrations: [],
    subscribers: [],
})

import { AppDataSource } from "../data-source";
import { IDtorneo } from "../entity/torneo";

// Función para crear un torneo
export const crearTorneo = async (descripcion: string) => {
    const torneo = new IDtorneo();
    torneo.descripcion = descripcion;
    await AppDataSource.manager.save(torneo);
};

// Función para consultar todos los torneos
export const consultarTorneos = async () => {
    return await AppDataSource.manager.find(IDtorneo);
};

import { AppDataSource } from "../data-source";
import { IDpartido } from "../entity/partido";

// Función para crear un partido
export const crearPartido = async (idtorneo: number, idequipo1: number, idequipo2: number, goles1: number, goles2: number, observaciones: string) => {
    const partido = new IDpartido();
    partido.idtorneo = idtorneo;
    partido.idequipo1 = idequipo1;
    partido.idequipo2 = idequipo2;
    partido.goles1 = goles1;
    partido.goles2 = goles2;
    partido.observaciones = observaciones;
    await AppDataSource.manager.save(partido);
};

// Función para consultar todos los partidos
export const consultarPartidos = async () => {
    return await AppDataSource.manager.find(IDpartido);
};

// Función para modificar un partido
export const modificarPartido = async (id: number, idtorneo?: number, idequipo1?: number, idequipo2?: number, goles1?: number, goles2?: number, observaciones?: string) => {
    const partido = await AppDataSource.manager.findOneBy(IDpartido, { id });
    if (partido) {
        if (idtorneo) partido.idtorneo = idtorneo;
        if (idequipo1) partido.idequipo1 = idequipo1;
        if (idequipo2) partido.idequipo2 = idequipo2;
        if (goles1 !== undefined) partido.goles1 = goles1;
        if (goles2 !== undefined) partido.goles2 = goles2;
        if (observaciones) partido.observaciones = observaciones;
        await AppDataSource.manager.save(partido);
    }
};

// Función para eliminar un partido
export const eliminarPartido = async (id: number) => {
    const partido = await AppDataSource.manager.findOneBy(IDpartido, { id });
    if (partido) {
        await AppDataSource.manager.remove(partido);
    }
};

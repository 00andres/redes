import { AppDataSource } from "../data-source";
import { IDequipo } from "../entity/equipo";

// Función para crear un equipo
export const crearEquipo = async (descripcion: string, serie: string) => {
    const equipo = new IDequipo();
    equipo.descripcion = descripcion;
    equipo.serie = serie;
    await AppDataSource.manager.save(equipo);
    return equipo
};

// Función para consultar todos los equipos
export const consultarEquipos = async () => {
    return await AppDataSource.manager.find(IDequipo);
};

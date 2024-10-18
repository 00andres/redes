import { Request, Response } from 'express';
import { AppDataSource } from '../data-source'; 
import { entorno } from '../entity/entorno'; 
import { equipos } from '../entity/equipos';
import { jugador } from '../entity/jugador';
import { torneo } from '../entity/torneo';

export class EntornoController {
    
    async actualizarEntorno(req: Request, res: Response) {
        const { nombreEntidad, idEntidad, idEntorno } = req.body;

        try {
            
            const entornoActual = await AppDataSource.manager.findOne(entorno, { where: { id: idEntorno } });

            if (!entornoActual) {
                return res.status(404).json({ mensaje: "Entorno no encontrado" });
            }

            let entidad;

            
            switch (nombreEntidad) {
                case 'equipos':
                    entidad = await AppDataSource.manager.findOne(equipos, { where: { id: idEntidad } });
                    break;
                case 'jugador':
                    entidad = await AppDataSource.manager.findOne(jugador, { where: { id: idEntidad } });
                    break;
                case 'torneo':
                    entidad = await AppDataSource.manager.findOne(torneo, { where: { id: idEntidad } });
                    break;
                default:
                    return res.status(400).json({ mensaje: "Entidad no válida" });
            }

            if (!entidad) {
                return res.status(404).json({ mensaje: "Elemento no encontrado" });
            }

            
            entidad.entorno = entornoActual; 
            await AppDataSource.manager.save(entidad);

            return res.status(200).json({ mensaje: "Entorno actualizado correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensaje: "Error al actualizar el entorno" });
        }
    }
}



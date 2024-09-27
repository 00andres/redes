import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { equipo } from "../entity/equipo"

export class EquipoController {

    private equipoRepository = AppDataSource.getRepository(equipo)

    // Obtener todos los equipos
    async all(request: Request, response: Response, next: NextFunction) {
        return this.equipoRepository.find()
    }

    // Obtener un equipo por ID
    async one(request: Request, response: Response, next: NextFunction) {
        return this.equipoRepository.findOneBy({ id: parseInt(request.params.id) })
    }

    // Crear un nuevo equipo
    async save(request: Request, response: Response, next: NextFunction) {
        return this.equipoRepository.save(request.body)
    }

    // Actualizar un equipo por ID
    async update(request: Request, response: Response, next: NextFunction) {
        const equipo = await this.equipoRepository.findOneBy({ id: parseInt(request.params.id) })
        if (equipo) {
            this.equipoRepository.merge(equipo, request.body)
            return this.equipoRepository.save(equipo)
        }
        return "Equipo no encontrado"
    }

    // Eliminar un equipo por ID
    async remove(request: Request, response: Response, next: NextFunction) {
        const equipoToRemove = await this.equipoRepository.findOneBy({ id: parseInt(request.params.id) })
        if (equipoToRemove) {
            await this.equipoRepository.remove(equipoToRemove)
        }
        return "Equipo eliminado"
    }
}

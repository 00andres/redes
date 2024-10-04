import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { torneo } from "../entity/torneo"

export class TorneoController {

    private torneoRepository = AppDataSource.getRepository(torneo)

    // Obtener todos los torneos
    async all(request: Request, response: Response, next: NextFunction) {
        return this.torneoRepository.find()
    }

    // Obtener un torneo por ID
    async one(request: Request, response: Response, next: NextFunction) {
        return this.torneoRepository.findOneBy({ id: parseInt(request.params.id) })
    }

    // Crear un nuevo torneo
    async save(request: Request, response: Response, next: NextFunction) {
        return this.torneoRepository.save(request.body)
    }

    // Actualizar un torneo por ID
    async update(request: Request, response: Response, next: NextFunction) {
        const torneo = await this.torneoRepository.findOneBy({ id: parseInt(request.params.id) })
        if (torneo) {
            this.torneoRepository.merge(torneo, request.body)
            return this.torneoRepository.save(torneo)
        }
        return "Torneo no encontrado"
    }

    // Eliminar un torneo por ID
    async remove(request: Request, response: Response, next: NextFunction) {
        const torneoToRemove = await this.torneoRepository.findOneBy({ id: parseInt(request.params.id) })
        if (torneoToRemove) {
            await this.torneoRepository.remove(torneoToRemove)
        }
        return "Torneo eliminado"
    }
}

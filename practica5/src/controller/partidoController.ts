import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Partido } from "../entity/partido";

export class PartidoController {
    private partidoRepository = AppDataSource.getRepository(Partido);

    // Obtener todos los partidos
    async all(request: Request, response: Response, next: NextFunction) {
        const partidos = await this.partidoRepository.find();
        return response.json(partidos);
    }

    // Obtener un partido por ID
    async one(request: Request, response: Response, next: NextFunction) {
        const partido = await this.partidoRepository.findOneBy({ id: parseInt(request.params.id) });
        return partido ? response.json(partido) : response.status(404).json({ message: "Partido no encontrado" });
    }

    // Crear un nuevo partido
    async save(request: Request, response: Response, next: NextFunction) {
        const partido = this.partidoRepository.create(request.body);
        await this.partidoRepository.save(partido);
        return response.status(201).json(partido);
    }

    // Actualizar un partido por ID
    async update(request: Request, response: Response, next: NextFunction) {
        const partido = await this.partidoRepository.findOneBy({ id: parseInt(request.params.id) });
        if (partido) {
            this.partidoRepository.merge(partido, request.body);
            await this.partidoRepository.save(partido);
            return response.json(partido);
        }
        return response.status(404).json({ message: "Partido no encontrado" });
    }

    // Eliminar un partido por ID
    async remove(request: Request, response: Response, next: NextFunction) {
        const partidoToRemove = await this.partidoRepository.findOneBy({ id: parseInt(request.params.id) });
        if (partidoToRemove) {
            await this.partidoRepository.remove(partidoToRemove);
            return response.json({ message: "Partido eliminado" });
        }
        return response.status(404).json({ message: "Partido no encontrado" });
    }
}

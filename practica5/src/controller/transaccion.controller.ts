import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Transaccion } from "../entity/transaccion";
import { TransaccionDTO } from "../dto/transaccion.dto";
import { validate } from "class-validator";

export class TransaccionController {
    private transaccionRepository = AppDataSource.getRepository(Transaccion);

    async all(request: Request, response: Response, next: NextFunction) {
        const transacciones = await this.transaccionRepository.find();
        response.json(transacciones);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const transaccion = await this.transaccionRepository.findOneBy({ id: parseInt(request.params.id) });
        if (transaccion) {
            response.json(transaccion);
        } else {
            response.status(404).json({ message: "Transacción no encontrada" });
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const transaccionDTO = new TransaccionDTO();
        Object.assign(transaccionDTO, request.body);

        const errors = await validate(transaccionDTO);
        if (errors.length > 0) {
            return response.status(400).json(errors);
        }

        const nuevaTransaccion = this.transaccionRepository.create(transaccionDTO);
        const transaccionGuardada = await this.transaccionRepository.save(nuevaTransaccion);
        response.status(201).json(transaccionGuardada);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const transaccion = await this.transaccionRepository.findOneBy({ id: parseInt(request.params.id) });
        if (transaccion) {
            this.transaccionRepository.merge(transaccion, request.body);
            const transaccionActualizada = await this.transaccionRepository.save(transaccion);
            response.json(transaccionActualizada);
        } else {
            response.status(404).json({ message: "Transacción no encontrada" });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const transaccion = await this.transaccionRepository.findOneBy({ id: parseInt(request.params.id) });
        if (transaccion) {
            await this.transaccionRepository.remove(transaccion);
            response.status(204).send();
        } else {
            response.status(404).json({ message: "Transacción no encontrada" });
        }
    }
}

import { AppDataSource } from "../data-source";
import { Transaccion } from "../entity/transaccion";

export class TransaccionRepository {
    private repository = AppDataSource.getRepository(Transaccion);

    async findAll() {
        return this.repository.find();
    }

    async findById(id: number) {
        return this.repository.findOneBy({ id });
    }

    async save(transaccion: Transaccion) {
        return this.repository.save(transaccion);
    }

    async update(transaccion: Transaccion) {
        return this.repository.save(transaccion);
    }

    async remove(id: number) {
        const transaccion = await this.findById(id);
        if (transaccion) {
            await this.repository.remove(transaccion);
        }
    }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipo_entity_1 = require("../entity/equipo.entity");
let EquipoService = class EquipoService {
    constructor(equipoRepository) {
        this.equipoRepository = equipoRepository;
    }
    async findAll() {
        return this.equipoRepository.find();
    }
    async findOne(id) {
        const equipo = await this.equipoRepository.findOne({ where: { id } });
        if (!equipo) {
            throw new common_1.NotFoundException(`Equipo con ID ${id} no encontrado`);
        }
        return equipo;
    }
    async create(createEquipoDto) {
        const newEquipo = this.equipoRepository.create(createEquipoDto);
        return this.equipoRepository.save(newEquipo);
    }
    async update(id, updateEquipoDto) {
        const equipo = await this.findOne(id);
        const updatedEquipo = Object.assign(equipo, updateEquipoDto);
        return this.equipoRepository.save(updatedEquipo);
    }
    async delete(id) {
        const result = await this.equipoRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Equipo con ID ${id} no encontrado`);
        }
        return true;
    }
};
exports.EquipoService = EquipoService;
exports.EquipoService = EquipoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipo_entity_1.Equipo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquipoService);
//# sourceMappingURL=equipo.service.js.map
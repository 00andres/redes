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
exports.EquipoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const equipo_service_1 = require("../services/equipo.service");
const create_equipo_dto_1 = require("../dto/create-equipo.dto");
const equipo_entity_1 = require("../entity/equipo.entity");
let EquipoResolver = class EquipoResolver {
    constructor(equipoService) {
        this.equipoService = equipoService;
    }
    async getEquipos() {
        return this.equipoService.findAll();
    }
    async createEquipo(input) {
        return this.equipoService.create(input);
    }
};
exports.EquipoResolver = EquipoResolver;
__decorate([
    (0, graphql_1.Query)(() => [equipo_entity_1.Equipo], { name: 'equipos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipoResolver.prototype, "getEquipos", null);
__decorate([
    (0, graphql_1.Mutation)(() => equipo_entity_1.Equipo),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipo_dto_1.CreateEquipoDto]),
    __metadata("design:returntype", Promise)
], EquipoResolver.prototype, "createEquipo", null);
exports.EquipoResolver = EquipoResolver = __decorate([
    (0, graphql_1.Resolver)(() => equipo_entity_1.Equipo),
    __metadata("design:paramtypes", [equipo_service_1.EquipoService])
], EquipoResolver);
//# sourceMappingURL=equipo.resolver.js.map
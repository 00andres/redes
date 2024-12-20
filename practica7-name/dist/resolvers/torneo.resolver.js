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
exports.TorneoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const torneo_service_1 = require("../services/torneo.service");
const create_torneo_dto_1 = require("../dto/create-torneo.dto");
const torneo_entity_1 = require("../entity/torneo.entity");
let TorneoResolver = class TorneoResolver {
    constructor(torneoService) {
        this.torneoService = torneoService;
    }
    async getTorneos() {
        return this.torneoService.findAll();
    }
    async createTorneo(input) {
        return this.torneoService.create(input);
    }
};
exports.TorneoResolver = TorneoResolver;
__decorate([
    (0, graphql_1.Query)(() => [torneo_entity_1.Torneo], { name: 'torneos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TorneoResolver.prototype, "getTorneos", null);
__decorate([
    (0, graphql_1.Mutation)(() => torneo_entity_1.Torneo),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_torneo_dto_1.CreateTorneoDto]),
    __metadata("design:returntype", Promise)
], TorneoResolver.prototype, "createTorneo", null);
exports.TorneoResolver = TorneoResolver = __decorate([
    (0, graphql_1.Resolver)(() => torneo_entity_1.Torneo),
    __metadata("design:paramtypes", [torneo_service_1.TorneoService])
], TorneoResolver);
//# sourceMappingURL=torneo.resolver.js.map
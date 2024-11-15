"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const user_entity_1 = require("./entity/user.entity");
const equipo_entity_1 = require("./entity/equipo.entity");
const torneo_entity_1 = require("./entity/torneo.entity");
const app_resolver_1 = require("./app.resolver");
const user_resolver_1 = require("./resolvers/user.resolver");
const torneo_resolver_1 = require("./resolvers/torneo.resolver");
const equipo_resolver_1 = require("./resolvers/equipo.resolver");
const user_service_1 = require("./services/user.service");
const equipo_service_1 = require("./services/equipo.service");
const torneo_service_1 = require("./services/torneo.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const dbUsername = configService.get('DB_USERNAME');
                    if (!dbUsername) {
                        throw new Error('DB_USERNAME is missing');
                    }
                    return {
                        type: 'mysql',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: dbUsername,
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        entities: [user_entity_1.User, equipo_entity_1.Equipo, torneo_entity_1.Torneo],
                        synchronize: true,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, equipo_entity_1.Equipo, torneo_entity_1.Torneo]),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'schema.gql',
                playground: true,
                path: 'graphql',
            }),
        ],
        providers: [
            app_resolver_1.AppResolver,
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            torneo_resolver_1.TorneoResolver,
            torneo_service_1.TorneoService,
            equipo_resolver_1.EquipoResolver,
            equipo_service_1.EquipoService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
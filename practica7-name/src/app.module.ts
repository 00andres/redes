import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { User } from './entity/user.entity';
import { Equipo } from './entity/equipo.entity';
import { Torneo } from './entity/torneo.entity';  
import { AppResolver } from './app.resolver';
import { UserResolver } from './resolvers/user.resolver';  
import { TorneoResolver } from './resolvers/torneo.resolver';
import { EquipoResolver } from './resolvers/equipo.resolver';
import { UserService } from './services/user.service';
import { EquipoService } from './services/equipo.service';
import { TorneoService } from './services/torneo.service';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),

    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUsername = configService.get<string>('DB_USERNAME');
        if (!dbUsername) {
          throw new Error('DB_USERNAME is missing');
        }

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: dbUsername,
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User, Equipo, Torneo], 
          synchronize: true,
        };
      },
    }),

    
    TypeOrmModule.forFeature([User, Equipo, Torneo]),

   
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: 'schema.gql', 
      playground: true,             
      path: 'graphql',              
    }),
  ],
  providers: [
    AppResolver,
    UserResolver,
    UserService,
    TorneoResolver,
    TorneoService,    
    EquipoResolver,
    EquipoService,
  ],
})
export class AppModule {}

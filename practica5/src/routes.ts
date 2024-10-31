import { Router } from "express";
import { UserController } from "./controller/UserController";
import { EquipoController } from "./controller/equipoController";
import { TorneoController } from "./controller/torneoCronttoller";
import { PartidoController } from "./controller/partidoController";
import { TransaccionController } from "./controller/transaccion.controller";

const router = Router();

// Rutas de UserController
export const Routes = [
    { method: "get", route: "/users", controller: UserController, action: "all" },
    { method: "get", route: "/users/:id", controller: UserController, action: "one" },
    { method: "post", route: "/users", controller: UserController, action: "save" },
    { method: "patch", route: "/users/:id", controller: UserController, action: "update" },
    { method: "delete", route: "/users/:id", controller: UserController, action: "remove" },

    // Rutas de EquipoController
    { method: "get", route: "/equipos", controller: EquipoController, action: "all" },
    { method: "get", route: "/equipos/:id", controller: EquipoController, action: "one" },
    { method: "post", route: "/equipos", controller: EquipoController, action: "save" },
    { method: "patch", route: "/equipos/:id", controller: EquipoController, action: "update" },
    { method: "delete", route: "/equipos/:id", controller: EquipoController, action: "remove" },

    // Rutas de TorneoController
    { method: "get", route: "/torneos", controller: TorneoController, action: "all" },
    { method: "get", route: "/torneos/:id", controller: TorneoController, action: "one" },
    { method: "post", route: "/torneos", controller: TorneoController, action: "save" },
    { method: "patch", route: "/torneos/:id", controller: TorneoController, action: "update" },
    { method: "delete", route: "/torneos/:id", controller: TorneoController, action: "remove" },

    // Rutas de PartidoController
    { method: "get", route: "/partidos", controller: PartidoController, action: "all" },
    { method: "get", route: "/partidos/:id", controller: PartidoController, action: "one" },
    { method: "post", route: "/partidos", controller: PartidoController, action: "save" },
    { method: "patch", route: "/partidos/:id", controller: PartidoController, action: "update" },
    { method: "delete", route: "/partidos/:id", controller: PartidoController, action: "remove" },

    // Rutas de TransaccionController
    { method: "get", route: "/transacciones", controller: TransaccionController, action: "all" },
    { method: "get", route: "/transacciones/:id", controller: TransaccionController, action: "one" },
    { method: "post", route: "/transacciones", controller: TransaccionController, action: "save" },
    { method: "patch", route: "/transacciones/:id", controller: TransaccionController, action: "update" },
    { method: "delete", route: "/transacciones/:id", controller: TransaccionController, action: "remove" },
];

export default router;

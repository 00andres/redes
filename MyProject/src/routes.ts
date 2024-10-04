import { UserController } from "./controller/UserController"
import { EquipoController } from "./controller/equipoController"
import { TorneoController } from "./controller/torneoController"
export const Routes = [
    { method: "get", route: "/users", controller: UserController, action: "all" },
    { method: "get", route: "/users/:id", controller: UserController, action: "one" },
    { method: "post", route: "/users", controller: UserController, action: "save" },
    { method: "patch", route: "/users/:id", controller: UserController, action: "update" },
    { method: "delete", route: "/users/:id", controller: UserController, action: "remove" },
    
    { method: "get", route: "/equipos", controller: EquipoController, action: "all" },
    { method: "get", route: "/equipos/:id", controller: EquipoController, action: "one" },
    { method: "post", route: "/equipos", controller: EquipoController, action: "save" },
    { method: "patch", route: "/equipos/:id", controller: EquipoController, action: "update" },
    { method: "delete", route: "/equipos/:id", controller: EquipoController, action: "remove" },

    { method: "get", route: "/torneos", controller: TorneoController, action: "all" },
    { method: "get", route: "/torneos/:id", controller: TorneoController, action: "one" },
    { method: "post", route: "/torneos", controller: TorneoController, action: "save" },
    { method: "patch", route: "/torneos/:id", controller: TorneoController, action: "update" },
    { method: "delete", route: "/torneos/:id", controller: TorneoController, action: "remove" }
]
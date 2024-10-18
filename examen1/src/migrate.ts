import { AppDataSource } from "./data-source";
import { equipos } from "./entity/equipos";  
import { jugador } from "./entity/jugador";  
import { torneo } from "./entity/torneo";    
import { entorno } from "./entity/entorno";  


const entidades = {
    equipos: {
        totalelementos1: 10,  
        tipo: "maestro",
        datos: [
            { nombre: "Equipo A", jugadores: "Juan, Pedro, Luis", equipoN: "Primera División", torneo: "Torneo Nacional" },
            { nombre: "Equipo B", jugadores: "Carlos, Andrés, Diego", equipoN: "Segunda División", torneo: "Torneo Regional" },
            { nombre: "Equipo C", jugadores: "Pablo, Mario, José", equipoN: "Tercera División", torneo: "Torneo Local" },
            { nombre: "Equipo D", jugadores: "Luis, Jorge, Ana", equipoN: "Cuarta División", torneo: "Torneo Amistoso" },
            { nombre: "Equipo E", jugadores: "Sofia, Laura, Juan", equipoN: "Primera División", torneo: "Torneo Nacional" },
            { nombre: "Equipo F", jugadores: "Diego, Gabriel, Mónica", equipoN: "Segunda División", torneo: "Torneo Regional" },
            { nombre: "Equipo G", jugadores: "Roberto, Carlos, Esteban", equipoN: "Tercera División", torneo: "Torneo Local" },
            { nombre: "Equipo H", jugadores: "Ana, Paula, Felipe", equipoN: "Cuarta División", torneo: "Torneo Amistoso" },
            { nombre: "Equipo I", jugadores: "María, José, Nicolás", equipoN: "Primera División", torneo: "Torneo Nacional" },
            { nombre: "Equipo J", jugadores: "Pedro, Hugo, Daniel", equipoN: "Segunda División", torneo: "Torneo Regional" },
        ]
    },

    jugadores: {
        totalelementos1: 10,  
        tipo: "maestro",
        datos: [
            { nombre: "Juan", equipo: "Equipo A" },
            { nombre: "Pedro", equipo: "Equipo A" },
            { nombre: "Carlos", equipo: "Equipo B" },
            { nombre: "Andrés", equipo: "Equipo B" },
            { nombre: "Diego", equipo: "Equipo C" },
            { nombre: "Pablo", equipo: "Equipo C" },
            { nombre: "Mario", equipo: "Equipo D" },
            { nombre: "Luis", equipo: "Equipo E" },
            { nombre: "Jorge", equipo: "Equipo F" },
            { nombre: "Sofía", equipo: "Equipo G" },
        ]
    },

    torneos: {
        totalelementos1: 10,  
        tipo: "maestro",
        datos: [
            { nombre: "Torneo Nacional", equipo: "Equipo A" },
            { nombre: "Torneo Regional", equipo: "Equipo B" },
            { nombre: "Torneo Local", equipo: "Equipo C" },
            { nombre: "Torneo Amistoso", equipo: "Equipo D" },
            { nombre: "Torneo Intercontinental", equipo: "Equipo E" },
            { nombre: "Torneo Internacional", equipo: "Equipo F" },
            { nombre: "Torneo Nacional Juvenil", equipo: "Equipo G" },
            { nombre: "Torneo de Verano", equipo: "Equipo H" },
            { nombre: "Torneo de Invierno", equipo: "Equipo I" },
            { nombre: "Torneo de Primavera", equipo: "Equipo J" },
        ]
    }
};

async function migrarDatos() {
    try {
        await AppDataSource.initialize();

        
        const entornoDesarrollo = new entorno();
        entornoDesarrollo.descripcion = "Desarrollo";

        const entornoPruebas = new entorno();
        entornoPruebas.descripcion = "Pruebas";

        const entornoProduccion = new entorno();
        entornoProduccion.descripcion = "Producción";

        await AppDataSource.manager.save([entornoDesarrollo, entornoPruebas, entornoProduccion]);

        for (const equipoData of entidades.equipos.datos) {
            const equipo = new equipos();
            equipo.nombre = equipoData.nombre;
            equipo.jugadores = equipoData.jugadores;
            equipo.equipoN = equipoData.equipoN;
            equipo.torneo = equipoData.torneo;
            equipo.entorno = entornoPruebas;  

            await AppDataSource.manager.save(equipo);
        }

        
        for (const jugadorData of entidades.jugadores.datos) {
            const nuevoJugador = new jugador();
            nuevoJugador.nombre = jugadorData.nombre;
            nuevoJugador.equipo = jugadorData.equipo;
            nuevoJugador.entorno = entornoPruebas;

            await AppDataSource.manager.save(nuevoJugador);
        }

        
        for (const torneoData of entidades.torneos.datos) {
            const nuevoTorneo = new torneo();
            nuevoTorneo.nombre = torneoData.nombre;
            nuevoTorneo.equipo = torneoData.equipo;
            nuevoTorneo.entorno = entornoPruebas;

            await AppDataSource.manager.save(nuevoTorneo);
        }

        console.log("Datos migrados correctamente.");
    } catch (error) {
        console.log("Error al migrar los datos: ", error);
    } finally {
        await AppDataSource.destroy();
    }
}

// Ejecutar la migración al correr este archivo
migrarDatos();

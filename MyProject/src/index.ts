import { AppDataSource } from "./data-source"
import app from "./app"

AppDataSource.initialize().then(() => {
    // Iniciar el servidor en el puerto 3000
    app.listen(3000, () => {
        console.log("El servidor está corriendo en http://localhost:3000")
    })
}).catch(error => console.log("Error al conectar con la base de datos: ", error))

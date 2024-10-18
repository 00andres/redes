import express from "express";
import { AppDataSource } from "./data-source"; 
import entornoRoutes from './routes/entornoRoutes'; 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use("/api", entornoRoutes); 

app.get("/", (req, res) => {
    res.send("Servidor en funcionamiento");
});


AppDataSource.initialize()
    .then(() => {
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });

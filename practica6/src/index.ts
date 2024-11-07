import * as express from "express"; 
import * as cors from "cors"; 
import userRoutes from "./routes/userRoutes";
import torneoRoutes from "./routes/torneoRoutes";
import equipoRoutes from "./routes/equipoRoutes";
import { AppDataSource } from "./data-source"; 

const app = express();
app.use(cors());  
app.use(express.json());


AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos establecida");

   
    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
  });


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/torneos", torneoRoutes);
app.use("/api/v1/equipos", equipoRoutes);

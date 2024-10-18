import express from 'express';
import entornoRoutes from './routes/entornoRoutes'; 
const app = express();

app.use(express.json()); 
app.use('/api', entornoRoutes); 

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});

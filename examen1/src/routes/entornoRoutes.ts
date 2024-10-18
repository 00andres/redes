import { Router } from 'express';
import { EntornoController } from '../controllers/entornoController';

const router = Router();
const entornoController = new EntornoController();


router.put('/entorno', entornoController.actualizarEntorno.bind(entornoController));

export default router;

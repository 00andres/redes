import { Request, Response, Router } from "express";
import { EquipoService } from "../services/EquipoService";
import { validate } from "class-validator";
import { CreateEquipoDto } from "../dto/CreateEquipoDto";
import { UpdateEquipoDto } from "../dto/UpdateEquipoDto";

const router = Router();
const equipoService = new EquipoService();


router.get("/", async (_req: Request, res: Response) => {
  try {
    const equipos = await equipoService.findAll();
    res.status(200).json(equipos); 
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
});

// Crear un equipo
router.post("/", async (req: Request, res: Response) => {
  const createEquipoDto = Object.assign(new CreateEquipoDto(), req.body); 
  const errors = await validate(createEquipoDto);
  
  if (errors.length > 0) {
    return res.status(400).json(errors); 
  }

  try {
    const newEquipo = await equipoService.create(createEquipoDto);
    res.status(201).json(newEquipo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el equipo" });
  }
});

// Actualizar un equipo
router.patch("/:id", async (req: Request, res: Response) => {
  const updateEquipoDto = Object.assign(new UpdateEquipoDto(), req.body); 
  const errors = await validate(updateEquipoDto);

  if (errors.length > 0) {
    return res.status(400).json(errors); //
  }

  try {
    const updatedEquipo = await equipoService.update(parseInt(req.params.id), req.body);
    
    if (updatedEquipo) {
      res.status(200).json(updatedEquipo);
    } else {
      res.status(404).json({ message: "Equipo no encontrado" }); 
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el equipo" });
  }
});

// Eliminar un equipo
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await equipoService.delete(parseInt(req.params.id));
    
    if (result.deleted) {
      res.status(200).json({ message: "Equipo eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Equipo no encontrado" }); 
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el equipo" });
  }
});

export default router;

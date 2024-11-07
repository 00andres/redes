import { Router } from "express";
import { EquipoService } from "../services/EquipoService";
import { validate } from "class-validator";
import { CreateEquipoDto } from "../dto/CreateEquipoDto";
import { UpdateEquipoDto } from "../dto/UpdateEquipoDto"; 

const router = Router();
const equipoService = new EquipoService();

// Ruta para obtener todos los equipos 
router.get("/", async (_req, res) => {
  try {
    const equipos = await equipoService.findAll(); 
    res.status(200).json(equipos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
});

// Ruta para crear un equipo 
router.post("/", async (req, res) => {
  const createEquipoDto = new CreateEquipoDto();
  Object.assign(createEquipoDto, req.body);

  const errors = await validate(createEquipoDto);
  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const newEquipo = await equipoService.create(createEquipoDto);
    res.status(201).json(newEquipo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el equipo" });
  }
});

// Ruta para actualizar un equipo 
router.patch("/:id", async (req, res) => {
  const updateEquipoDto = new UpdateEquipoDto();
  Object.assign(updateEquipoDto, req.body);

  const errors = await validate(updateEquipoDto);
  if (errors.length > 0) return res.status(400).json(errors);

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

// Ruta para eliminar un equipo 
router.delete("/:id", async (req, res) => {
  try {
    const result = await equipoService.delete(parseInt(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el equipo" });
  }
});

export default router;

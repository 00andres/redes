
import { Router } from "express";
import { TorneoService } from "../services/TorneoService";
import { validate } from "class-validator";
import { CreateTorneoDto } from "../dto/CreateTorneoDto";
import { UpdateTorneoDto } from "../dto/UpdateTorneoDto";

const router = Router();
const torneoService = new TorneoService();

router.get("/", async (_req, res) => {
  try {
    const torneos = await torneoService.findAll();
    res.json(torneos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los torneos" });
  }
});

router.post("/", async (req, res) => {
  const createTorneoDto = new CreateTorneoDto();
  Object.assign(createTorneoDto, req.body);

  const errors = await validate(createTorneoDto);
  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const newTorneo = await torneoService.create(createTorneoDto);
    res.status(201).json(newTorneo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el torneo" });
  }
});

router.patch("/:id", async (req, res) => {
  const updateTorneoDto = new UpdateTorneoDto();
  Object.assign(updateTorneoDto, req.body);

  const errors = await validate(updateTorneoDto);
  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const updatedTorneo = await torneoService.update(parseInt(req.params.id), req.body);
    res.json(updatedTorneo);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el torneo" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await torneoService.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el torneo" });
  }
});

export default router;

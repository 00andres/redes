import { Request, Response, Router } from "express";
import { TorneoService } from "../services/TorneoService";
import { validate } from "class-validator";
import { CreateTorneoDto } from "../dto/CreateTorneoDto";
import { UpdateTorneoDto } from "../dto/UpdateTorneoDto";

const router = Router();
const torneoService = new TorneoService();

router.get("/", async (_req: Request, res: Response) => {
  const torneos = await torneoService.findAll();
  res.json(torneos);
});

router.post("/", async (req: Request, res: Response) => {
  const createTorneoDto = Object.assign(new CreateTorneoDto(), req.body);
  const errors = await validate(createTorneoDto);
  if (errors.length > 0) return res.status(400).json(errors);

  const newTorneo = await torneoService.create(req.body);
  res.status(201).json(newTorneo);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const updateTorneoDto = Object.assign(new UpdateTorneoDto(), req.body);
  const errors = await validate(updateTorneoDto);
  if (errors.length > 0) return res.status(400).json(errors);

  const updatedTorneo = await torneoService.update(parseInt(req.params.id), req.body);
  res.json(updatedTorneo);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const result = await torneoService.delete(parseInt(req.params.id));
  res.json(result);
});

export default router;

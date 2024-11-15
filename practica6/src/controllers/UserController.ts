import { Request, Response, Router } from "express";
import { UserService } from "../services/UserService";
import { validate } from "class-validator";
import { CreateUserDto } from "../dto/CreateUserDto";
import { UpdateUserDto } from "../dto/UpdateUserDto";

const router = Router();
const userService = new UserService();

router.get("/", async (_req: Request, res: Response) => {
  const users = await userService.findAll();
  res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
  const createUserDto = Object.assign(new CreateUserDto(), req.body);
  const errors = await validate(createUserDto);
  if (errors.length > 0) return res.status(400).json(errors);

  const newUser = await userService.create(req.body);
  res.status(201).json(newUser);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const updateUserDto = Object.assign(new UpdateUserDto(), req.body);
  const errors = await validate(updateUserDto);
  if (errors.length > 0) return res.status(400).json(errors);

  const updatedUser = await userService.update(parseInt(req.params.id), req.body);
  res.json(updatedUser);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const result = await userService.delete(parseInt(req.params.id));
  res.json(result);
});

export default router;

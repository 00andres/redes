import { Router } from "express";
import { UserService } from "../services/UserService";
import { validate } from "class-validator";
import { CreateUserDto } from "../dto/CreateUserDto";
import { UpdateUserDto } from "../dto/UpdateUserDto";

const router = Router();
const userService = new UserService();

// Obtener todos los usuarios
router.get("/", async (_req, res) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  const createUserDto = new CreateUserDto();
  Object.assign(createUserDto, req.body);  

  const errors = await validate(createUserDto);
  if (errors.length > 0) return res.status(400).json(errors);

  try {
    
    const newUser = await userService.create(createUserDto);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

// Actualizar un usuario
router.patch("/:id", async (req, res) => {
  const updateUserDto = new UpdateUserDto();
  Object.assign(updateUserDto, req.body);

  const errors = await validate(updateUserDto);
  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const updatedUser = await userService.update(parseInt(req.params.id), req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const result = await userService.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
});

export default router;

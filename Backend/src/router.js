import { Router } from "express";
import {
  agregarUsuariosController,
  loginController,
  obtenerUsuarioController
} from "./controller/usersController.js";
import { authMiddleware } from "./middleware/auth.js";

export const allRoutes = Router();

allRoutes.post("/usuarios", agregarUsuariosController);
allRoutes.post("/login", loginController);
allRoutes.get('/usuarios', authMiddleware, obtenerUsuarioController);
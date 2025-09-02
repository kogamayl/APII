import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userControllers.js";

const router = express.Router();

// Criar usuário
router.post("/", createUser);

// Listar usuários
router.get("/", getUsers);

// Login
router.post("/login", loginUser);

export default router;


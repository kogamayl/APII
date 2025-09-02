import prisma from "../src/config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.json({ token });
};


export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user);
};


export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, role },
    });
    res.json(user);
  } catch {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
};

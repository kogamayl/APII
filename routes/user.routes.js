import express from "express";
import { createUser, getUsers, loginUser, updateUser } from "../controllers/userControllers.js";
import { authenticate } from "../middlewares/auth.js"
import { checkRole } from "../middlewares/checkRole.js"

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/", authenticate, getUsers);

router.put("/:id", authenticate, checkRole("ADMIN"), updateUser);

export default router;



/* 
    CRUD sem express ou seja nativo do node 
    CRUD com express , nest , fastify
    baanco de dodos (mysql , SQLlite , PostgreSql , Mariadb)
    estrurura mvc
    express-validation
    user um ORM
    JWT    
*/
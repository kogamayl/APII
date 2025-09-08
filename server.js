import express from "express";
import userRoutes from "./routes/user.routes.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/GRUPOS", userRoutes);
app.use("/ITENS", userRoutes);

const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log("Pezin no chão, rodando na porta " + port);
});

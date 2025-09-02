import express from "express";
import userRoutes from "./routes/user.routes.js";




const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Pezin no chão, rodando na porta 3000 ");
});

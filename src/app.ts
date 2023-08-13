import express, { Application, json } from "express";
import { connectDatabase } from "./database";
import { create, deleteMovie, read, retrieve, update } from "./logics";
import { ensureIdExists, ensureNameExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/movies", ensureNameExists, create);
app.get("/movies", read);

app.get("/movies/:id", ensureIdExists, retrieve);
app.patch("/movies/:id", ensureIdExists, ensureNameExists, update);
app.delete("/movies/:id", ensureIdExists, deleteMovie);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, async () => {
  await connectDatabase();
  console.log("Server running");
});

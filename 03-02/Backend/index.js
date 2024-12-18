import "dotenv/config";
import cors from "cors";
import "dotenv/config";
import express from "express";
import todoRoute from "./routes/todo.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/todos", todoRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

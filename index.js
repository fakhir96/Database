import express from 'express';
import courseRouter from './routes/courseRouter.js';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
const PORT = 4000;

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + "/public"));

app.use('/api', courseRouter);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "index.html")),
);

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
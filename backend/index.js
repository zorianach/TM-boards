import "dotenv/config";
import "./db.js";
import express from 'express';
import cors from 'cors';
// import boardsRouter from './routes/boards.js';
// import cardRouter from './routes/cards.js';
import morgan from "morgan";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api", router);

// Обробка незнайдених маршрутів
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Обробка помилок
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server error";
    res.status(status).json({ message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

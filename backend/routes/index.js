import express from "express";
import boardsRouter from "./boardsRouter.js";
import cardRouter from "./cardRouter.js";

const router = express.Router();


router.use('/', boardsRouter); // Маршрути для дошок
router.use('/board', cardRouter); // Маршрути для карток


export default router
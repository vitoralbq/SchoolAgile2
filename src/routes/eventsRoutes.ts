import express from "express";
import { eventController } from "../controllers/eventControllers";


const router = express.Router();

router.post("/", eventController.createEvent);

export default router;

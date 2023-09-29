import express from "express";
import { getModelsController, getModelRecordsController } from "../controllers/adminController";

const router = express.Router();

router.get("/models", getModelsController);
router.get("/models/:name", getModelRecordsController);

export default router;

import express from "express";
import {
  getModelsController,
  getModelRecordsController,
  getModelFieldsController,
  deleteRecordByIDController,
  deleteRecordsController,
  createRecordController,
  updateRecordByIDController,
} from "../controllers/adminController";

const router = express.Router();

router.get("/models", getModelsController);
router.get("/models/:model", getModelRecordsController);
router.get("/models/:model/fields", getModelFieldsController);
//
router.delete("/models/:name", deleteRecordsController);

router.delete("/models/:model/:id", deleteRecordByIDController);
router.post("/models/:model", createRecordController);
router.put("/models/:model/:id", updateRecordByIDController);

export default router;

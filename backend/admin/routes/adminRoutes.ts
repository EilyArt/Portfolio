import express from "express";
import {
  getUsersController
} from "../controllers/adminController";

const router = express.Router();

router.get("/models", getUsersController);

export default router;

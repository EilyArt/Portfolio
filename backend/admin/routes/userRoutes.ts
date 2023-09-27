import express from "express";
import {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.put("/:id", updateUserByIdController);
router.delete("/:id", deleteUserByIdController);

export default router;

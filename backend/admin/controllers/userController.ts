import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/user.model";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const user = await createUser(userData);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserByIdController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;

  try {
    const updatedUser = await updateUser(userId, userData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await deleteUser(userId);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

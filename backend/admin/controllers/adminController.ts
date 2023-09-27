import { Request, Response } from "express";
import { getAllModels } from "../models/admin.model";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllModels();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

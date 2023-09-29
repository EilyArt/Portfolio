import { Request, Response } from "express";
import { getAllModels, getModelRecords } from "../models/admin.model";

export const getModelsController = async (req: Request, res: Response) => {
  try {
    const models = await getAllModels();
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getModelRecordsController = async (req: Request, res: Response) => {
  try {
    const models = await getModelRecords(req.params.name);
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

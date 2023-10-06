import { Request, Response } from "express";
import {
  getAllModels,
  getModelRecords,
  deleteRecordByID,
  updateRecordByID,
  createRecord,
  deleteRecords,
  getModelFields,
} from "../models/admin.model";

export const getModelsController = async (req: Request, res: Response) => {
  try {
    const models = await getAllModels();
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getModelRecordsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const models = await getModelRecords(req.params.model);

    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecordByIDController = async (
  req: Request,
  res: Response,
) => {
  try {
    const models = await deleteRecordByID(req.params.model, req.params.id);
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecordByIDController = async (
  req: Request,
  res: Response,
) => {
  try {
    const updatedRecord = {
      model: req.params.model,
      id: req.params.id,
      updatedRecord: req.body.data,
    };
    const models = await updateRecordByID(updatedRecord);
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecordController = async (req: Request, res: Response) => {
  try {
    const record = {
      model: req.params.model,
      record: req.body.data,
    };
    const models = await createRecord(record);
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecordsController = async (req: Request, res: Response) => {
  try {
    const models = await deleteRecords(req.body);
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getModelFieldsController = async (req: Request, res: Response) => {
  try {
    const models = await getModelFields(req.params.model);
    res.json(models);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

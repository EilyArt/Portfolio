import { PrismaClient } from "@prisma/client";
import { withExclude } from "prisma-exclude";

const prisma: any = withExclude(new PrismaClient());

export const getAllModels = async (): Promise<any[]> => {
  try {
    const models = Object.getOwnPropertyNames(prisma).filter((str) =>
      /^[A-Z]/.test(str),
    );
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

export const getModelRecords = async (model: string) => {
  try {
    const models = await prisma[model].findMany({
      select: prisma.$exclude(model, ["password"]),
    });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

// DeleteOne: prisma[model].findOne(record).delete();
export const deleteRecordByID = async (
  model: string,
  id: string,
): Promise<any[]> => {
  try {
    const models = await prisma[model].delete({ where: { id } });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

// UpdateOne: prisma[model].findOne(record).update(updatedRecord);
export const updateRecordByID = async ({
  model,
  id,
  updatedRecord,
}: any): Promise<any[]> => {
  try {
    const models = await prisma[model].update({
      where: { id },
      data: updatedRecord,
    });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

// CreateOne: prisma[model].createOne(record);
export const createRecord = async ({ model, record }: any): Promise<any[]> => {
  try {
    const models = await prisma[model].create({ data: record });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

// DeleteMany: prisma[model].find({where: {x = y}}).deleteMany();
export const deleteRecords = async ({ model, where }: any): Promise<any[]> => {
  try {
    const models = await prisma[model].deleteMany({ where });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

// Get model's fields: prisma[model].getFields;
export const getModelFields = async (model: string): Promise<any[]> => {
  try {
    const models = await prisma[model].fields;
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

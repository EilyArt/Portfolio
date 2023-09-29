import { PrismaClient } from "@prisma/client";

const prisma:any = new PrismaClient();

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

export const getModelRecords = async (model: string): Promise<any[]> => {
  try {
    const models = await prisma[model].findMany();
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};
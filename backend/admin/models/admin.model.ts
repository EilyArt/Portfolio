import { PrismaClient, Prisma } from "@prisma/client";
import { withExclude } from "prisma-exclude";

const prisma: any = withExclude(new PrismaClient());

export const getAllModels = async (): Promise<any[]> => {
  try {
    const models = Object.getOwnPropertyNames(prisma).filter((str) =>
      /^[A-Z]/.test(str)
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

export const deleteRecordByID = async (
  model: string,
  id: string
): Promise<any[]> => {
  try {
    const models = await prisma[model].delete({ where: { id } });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

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

export const createRecord = async ({ model, record }: any): Promise<any[]> => {
  try {
    const newRecord: any = {};
    const isIdRegex = /\b\w*id\b/i;
    for (const [key, value] of Object.entries(record)) {
      if (isIdRegex.test(key) || value === null) continue;
      if (Array.isArray(value)) {
        const relations = value.map((item: any) => {
          return { id: item };
        });
        newRecord[key] = {
          connect: record.hasOwnProperty(`${key}Id`) ? relations[0] : relations,
        };
      } else {
        newRecord[key] = value;
      }
    }
    const models = await prisma[model].create({ data: newRecord });
    return models;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error creating record: ${error.message}`);
  }
};

export const deleteRecords = async ({ model, where }: any): Promise<any[]> => {
  try {
    const models = await prisma[model].deleteMany({ where });
    return models;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

export const getModelFields = async (modelName: string): Promise<any[]> => {
  try {
    const models = await Prisma.dmmf.datamodel.models;

    const model = models.filter(
      (mod: any) =>
        String(mod.name).toLowerCase() === String(modelName).toLowerCase()
    )[0].fields;

    // console.log(Prisma.dmmf.datamodel.enums);
    // console.log(model);

    for (const value of Object.values(model)) {
      if (value.kind === "enum") {
        const enums = await Prisma.dmmf.datamodel.enums.find(obj => obj.name === value.type);
        value.values = enums?.values;
      }
    }
    return model;
  } catch (error: any) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};

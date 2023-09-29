import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma["user"].findMany();
    return users;
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error: any) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  try {
    const user = await prisma.user.create({ data: userData });
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const updateUser = async (
  id: number,
  userData: Partial<User>,
): Promise<User | null> => {
  try {
    const user = await prisma.user.update({ where: { id }, data: userData });
    return user;
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export const deleteUser = async (id: number): Promise<User | null> => {
  try {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

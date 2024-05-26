import { Prisma, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import prismaClient from '../../core/db/prismaClient';
import { NotFoundError } from '../../core/utils/NotFoundError';

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prismaClient.user.findMany();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const result = await prismaClient.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!result) {
      throw new NotFoundError();
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request<never, never, Prisma.UserCreateInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, surname } = req.body;

  try {
    const result = await prismaClient.user.create({
      data: {
        name,
        surname,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (
  req: Request<never, never, User>,
  res: Response,
  next: NextFunction
) => {
  const { id, name, surname } = req.body;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundError();
    }

    const result = await prismaClient.user.update({
      where: { id },
      data: {
        name,
        surname,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    await prismaClient.user.delete({
      where: { id: Number(userId) },
    });
    res.json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
};

export default {
  getById,
  list,
  create,
  edit,
  deleteById,
};

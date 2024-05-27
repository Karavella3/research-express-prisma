import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prismaClient from '../../core/db/prismaClient';
import { NotFoundError } from '../../core/utils/NotFoundError';
import productCreateSchema from '../schemas/productCreateSchema';
import productEditSchema from '../schemas/productEditSchema';

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prismaClient.product.findMany();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const productId = Number(req.params.productId);

  try {
    const result = await prismaClient.product.findUnique({
      where: { id: productId },
    });

    if (!result) {
      throw new NotFoundError({
        details: {
          productId,
        },
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request<never, never, z.infer<typeof productCreateSchema>>,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;

  try {
    const result = await prismaClient.product.create({
      data: {
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (
  req: Request<never, never, z.infer<typeof productEditSchema>>,
  res: Response,
  next: NextFunction
) => {
  const { id, description, title } = req.body;

  try {
    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError({
        details: {
          id,
        },
      });
    }

    const result = await prismaClient.product.update({
      where: { id },
      data: {
        title,
        description,
        updatedAt: new Date(),
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const productId = Number(req.params.productId);

  try {
    await prismaClient.product.delete({
      where: { id: productId },
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

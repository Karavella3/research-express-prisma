import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prismaClient from '../../core/db/prismaClient';
import { NotFoundError } from '../../core/utils/NotFoundError';
import cartProductSchema from '../schemas/cartProductSchema';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const cartId = Number(req.params.cartId);

  try {
    const cart = await prismaClient.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        products: true,
      },
    });

    if (!cart) {
      throw new NotFoundError({
        details: {
          cartId,
        },
      });
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const product = async (
  req: Request<{ cartId: string }, never, z.infer<typeof cartProductSchema>>,
  res: Response,
  next: NextFunction
) => {
  const cartId = Number(req.params.cartId);
  const { productId, count } = req.body;

  try {
    const hasCart = await prismaClient.cart
      .findFirst({
        where: {
          id: cartId,
        },
      })
      .then(Boolean);

    const hasProduct = await prismaClient.product
      .findFirst({
        where: {
          id: productId,
        },
      })
      .then(Boolean);

    if (!hasProduct || !hasCart) {
      throw new NotFoundError({
        details: {
          cartId,
          productId,
          hasCart,
          hasProduct,
        },
      });
    }

    const result = await prismaClient.productsInCarts.upsert({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
      create: {
        cartId,
        productId,
        count,
      },
      update: {
        productId,
        count,
      },
    });

    await prismaClient.cart.update({
      where: {
        id: cartId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getById,
  product,
};

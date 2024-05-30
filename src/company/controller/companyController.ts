import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import prismaClient from '../../core/db/prismaClient';
import { NotFoundError } from '../../core/utils/NotFoundError';
import companyCreateSchema from '../schemas/companyCreateSchema';
import companyEditSchema from '../schemas/companyEditSchema';
import { companyUserIdSchema } from '../schemas/companyUserIdSchema';

const list = async (
  req: Request<never, never, never, { search?: string; userId?: string }>,
  res: Response,
  next: NextFunction
) => {
  const { search, userId } = req.query;

  try {
    const result = await prismaClient.company.findMany({
      where: {
        AND: [
          {
            name: search
              ? {
                  mode: 'insensitive',
                  startsWith: search,
                }
              : undefined,
          },
          {
            users: userId
              ? {
                  some: { id: Number(userId) },
                }
              : undefined,
          },
        ],
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = Number(req.params.companyId);

  try {
    const result = await prismaClient.company.findUnique({
      where: { id: companyId },
    });

    if (!result) {
      throw new NotFoundError({ details: { companyId } });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request<never, never, z.infer<typeof companyCreateSchema>>,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const result = await prismaClient.company.create({
      data: {
        name,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const edit = async (
  req: Request<never, never, z.infer<typeof companyEditSchema>>,
  res: Response,
  next: NextFunction
) => {
  const { id, name } = req.body;

  try {
    const company = await prismaClient.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundError({ details: { id } });
    }

    const result = await prismaClient.company.update({
      where: { id },
      data: {
        name,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = Number(req.params.companyId);

  try {
    const company = await prismaClient.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundError({ details: { companyId } });
    }

    await prismaClient.company.delete({
      where: { id: companyId },
    });

    res.json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
};

const appendUserByUserId = async (
  req: Request<
    { companyId: string },
    never,
    z.infer<typeof companyUserIdSchema>
  >,
  res: Response,
  next: NextFunction
) => {
  const companyId = Number(req.params.companyId);
  const { userId } = req.body;

  try {
    const result = await prismaClient.company.update({
      where: {
        id: companyId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeUserByUserId = async (
  req: Request<
    { companyId: string },
    never,
    z.infer<typeof companyUserIdSchema>
  >,
  res: Response,
  next: NextFunction
) => {
  const companyId = Number(req.params.companyId);
  const { userId } = req.body;

  try {
    const result = await prismaClient.company.update({
      where: {
        id: companyId,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const listProductsFromUsersCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO middleWare валидации req.params и req.query
  const companyId = Number(req.params.companyId);

  try {
    // Товары из корзин пользователей компании (companyId) сгруппированные по id товара
    // id, title, description - аттрибуты товара
    // count - сумма count из ProductsInCarts для товара из корзин пользователей компании
    const result = await prismaClient.$queryRaw<
      Array<{
        id: number;
        title: string;
        description: string;
        count: number;
      }>
    >`select "productId" as "id","title","description","count"  
      from (SELECT SUM("public"."ProductsInCarts"."count") as "count", 
      "public"."ProductsInCarts"."productId"  FROM "public"."ProductsInCarts" 
      LEFT JOIN "public"."Cart" ON ("public"."Cart"."id") = 
      ("public"."ProductsInCarts"."cartId") 
      LEFT JOIN "public"."User" ON ("public"."User"."cartId") = 
      ("public"."Cart"."id") WHERE (("public"."User"."id") 
      IN (SELECT "public"."_CompanyToUser"."B" FROM "public"."_CompanyToUser" 
      INNER JOIN "public"."Company" ON ("public"."Company"."id") = 
      ("public"."_CompanyToUser"."A") 
      WHERE ("public"."Company"."id" = ${companyId}
      AND "public"."_CompanyToUser"."B" IS NOT NULL)) 
      AND ("public"."User"."id" IS NOT NULL) 
      AND ("public"."Cart"."id" IS NOT NULL)) 
      GROUP BY "public"."ProductsInCarts"."productId") as "grouped1" 
      left join "public"."Product" on "grouped1"."productId" = "public"."Product"."id" `;
    // const result = await prismaClient.productsInCarts.groupBy({
    //   by: 'productId',
    //   where: {
    //     cart: {
    //       user: {
    //         companies: {
    //           some: { id: companyId },
    //         },
    //       },
    //     },
    //   },
    //   _sum: {
    //     count: true,
    //   },
    // });

    res.json(result);
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
  appendUserByUserId,
  removeUserByUserId,
  listProductsFromUsersCarts,
};

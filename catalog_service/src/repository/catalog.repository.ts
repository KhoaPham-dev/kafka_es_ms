import { ICatalogRepository } from "../interface/catalogRepository.interface.ts";
import { prismaClient, PrismaClient } from "../lib/prisma.ts";
import { Product } from "../models/product.model.ts";




export class CatalogRepository implements ICatalogRepository {

  _prisma: PrismaClient

  constructor() {
    this._prisma = prismaClient()
  }

  create(data: Product): Promise<Product> {
    return this._prisma.product.create({
      data
    })
  }
  update(data: Product): Promise<Product> {
    return this._prisma.product.update({
      where: {
        id: data.id
      },
      data
    })
  }
  async delete(id: any): Promise<void> {
    await this._prisma.product.delete({
      where: { id }
    })
  }
  find(limit: number, offset: number): Promise<Product[]> {
    return this._prisma.product.findMany({
      take: limit,
      skip: offset
    })
  }
  async findOne(id: number): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: { id }
    })

    if (product) {
      return product
    }

    throw new Error("product not found")
  }
  async findOneByName(name: string): Promise<Product> {
    const data = await this._prisma.product.findFirst({
      where: {
        name
      }
    }) as Product

    return data
  }
}
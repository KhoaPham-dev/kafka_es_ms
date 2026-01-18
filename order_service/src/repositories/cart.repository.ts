import { CartRepositoryType } from "../types/repository.type";

const createCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "mock creating cart db" })
}

const findMany = async (input: any): Promise<{}> => {
  return Promise.resolve({})
}

const findOne = async (input: any): Promise<{}> => {
  return Promise.resolve({})
}

const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({})
}

const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({})
}

export const CartRepository: CartRepositoryType = {
  create: createCart,
  findMany: findMany,
  findOne: findOne,
  update: updateCart,
  delete: deleteCart
}
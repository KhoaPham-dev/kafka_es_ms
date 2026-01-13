
import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../interface/catalogRepository.interface.ts";
import { Product } from "../models/product.model.ts";

const mockProduct = (rest: any): Product => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price({ dec: 0 }),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  }
}


export class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    const mockProduct = {
      id: 123,
      ...data,
    } as Product

    return Promise.resolve(mockProduct)
  }
  update(data: Product): Promise<Product> {
    return Promise.resolve(data)
  }
  delete(id: any): Promise<void> {
    return Promise.resolve()
  }
  find(limit: number, offset: number): Promise<Product[]> {
    const data = Array(limit).map(() => (mockProduct({})))

    return Promise.resolve(data)
  }
  findOne(id: number): Promise<Product | null> {
    return Promise.resolve({ id } as Product)
  }
  findOneByName(name: string): Promise<Product | null> {
    return Promise.resolve({ name } as Product)
  }
}
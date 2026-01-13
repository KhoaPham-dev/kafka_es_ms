import { Product } from "../models/product.model.ts";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: any): Promise<void>;
  find(limit: number, offset: number): Promise<Product[]>;
  findOne(id: number): Promise<Product | null>;
  findOneByName(name: string): Promise<Product | null>;
}
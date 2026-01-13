import { ICatalogRepository } from "../interface/catalogRepository.interface.ts";
import { Product } from "../models/product.model.ts";



export class CatalogService {

  private _repo: ICatalogRepository;

  constructor(repo: ICatalogRepository) {
    this._repo = repo;
  }

  async createProduct(input: any): Promise<Product> {
    const existed = await this._repo.findOneByName(input.name)
    if (existed) {
      throw new Error("Product already existed")
    }
    const data = await this._repo.create(input)
    return data
  }

  async updateProduct(input: any): Promise<Product> {
    const existed = await this._repo.findOne(input.id)
    if (!existed) {
      throw new Error("product not existed")
    }

    const data = this._repo.update(input)

    return data
  }

  async getProducts(limit: number, offset: number): Promise<Product[]> {
    const data = await this._repo.find(limit, offset)

    return data
  }

  async getProduct(id: number) {
    const data = await this._repo.findOne(id)

    if (!data) {
      throw new Error("product not existed")
    }

    return data
  }

  async deleteProduct(id: number) {
    const existed = await this._repo.findOne(id)
    if (!existed) {
      throw new Error("product not existed")
    }
    await this._repo.delete(id)

    return true
  }
}
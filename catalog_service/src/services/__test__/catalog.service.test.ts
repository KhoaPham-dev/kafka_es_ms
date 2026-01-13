import { jest } from '@jest/globals'
import { ICatalogRepository } from "../../interface/catalogRepository.interface.ts";
import { Product } from "../../models/product.model.ts";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository.ts";
import { CatalogService } from "../catalog.service.ts";
import { faker } from "@faker-js/faker"

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price({ dec: 0 }),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  }
}

describe("catalogService", () => {

  let repository: ICatalogRepository

  beforeEach(() => {
    repository = new MockCatalogRepository()
  })

  afterEach(() => {
    repository = {} as MockCatalogRepository
  })

  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository)
      const reqBody = mockProduct({})
      jest.spyOn(repository, "findOneByName").mockImplementationOnce(() => Promise.resolve(null))
      const result = await service.createProduct(reqBody)
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      })
    })

    test("should throw error with unable to create product", async () => {
      const service = new CatalogService(repository)
      const reqBody = mockProduct({})

      jest.spyOn(repository, "findOneByName").mockImplementationOnce(() => Promise.resolve(null))
      jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.reject(new Error("unable to create product")))

      expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product"
      )
    })

    test("should throw error with product already exist", async () => {
      const service = new CatalogService(repository)
      const reqBody = mockProduct({})

      jest.spyOn(repository, "findOneByName").mockImplementationOnce(() => Promise.resolve({} as Product))

      expect(service.createProduct(reqBody)).rejects.toThrow(
        "Product already existed"
      )
    })
  })

  describe("update product", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository)
      const reqbody = mockProduct({
        id: faker.number.int({ min: 10, max: 10000 })
      })
      const product = await service.updateProduct(reqbody)
      expect(product).toMatchObject(reqbody)
    })

    test("should error product not existed", () => {
      const service = new CatalogService(repository)

      const reqbody = mockProduct({
        id: faker.number.int({ min: 1, max: 10000 })
      })

      jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(null))

      expect(service.updateProduct(reqbody)).rejects.toThrow("product not existed")
    })
  })

  describe("get products", () => {

    test("should get products", async () => {

      const service = new CatalogService(repository)
      const randomLimit = faker.number.int({ min: 20, max: 50 })
      const data = await service.getProducts(randomLimit, 0)

      expect(data.length).toBeGreaterThanOrEqual(randomLimit)

      const expectData = Array(randomLimit).keys().map(() => ({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      }))
      expect(data).toMatchObject(expectData)
    })

    test("should get empty products", async () => {

      const service = new CatalogService(repository)
      const data = await service.getProducts(0, 0)

      expect(data.length).toEqual(0)

    })

  })

  describe("get product", () => {

    test("should get one product", async () => {

      const service = new CatalogService(repository)
      const mockedProduct = mockProduct({})
      jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(mockedProduct))
      const result = await service.getProduct(mockedProduct.id)

      expect(result).toMatchObject(mockedProduct)

    })

    test("should throw error product not existed", async () => {
      const service = new CatalogService(repository)

      jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(null))
      expect(service.getProduct(faker.number.int({ min: 1, max: 10000 }))).rejects.toThrow("product not existed")
    })

  })

  describe("delete product", () => {

    test("should delete product", async () => {

      const service = new CatalogService(repository)
      const mockedProduct = mockProduct({})
      const result = await service.deleteProduct(mockedProduct.id)

      expect(result).toEqual(true)

    })

    test("should throw error product not existed", async () => {
      const service = new CatalogService(repository)

      jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(null))
      expect(service.deleteProduct(faker.number.int({ min: 1, max: 10000 }))).rejects.toThrow("product not existed")
    })

  })
});
import request from 'supertest'
import app from '../../expressApp.ts'
import { faker } from '@faker-js/faker'
import { jest } from '@jest/globals'
import { catalogService } from '../catalog.route.ts'
import { ProductFactory } from '../../utils/fixtures/index.ts'

const mockRequest = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price({ dec: 0 }),
    stock: faker.number.int({ min: 10, max: 100 }),
    ...rest,
  }
}

describe("Catalog routes", () => {
  describe("POST /products", () => {
    test("should create product successfully", async () => {
      const reqBody = ProductFactory.build()

      jest.spyOn(catalogService, "createProduct").mockImplementationOnce(() => Promise.resolve(reqBody))

      const response = await request(app)
        .post("/products")
        .send(reqBody)
        .set("Accept", "application/json")

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject(reqBody)
    })

    test("should response with validation error 400", async () => {
      const reqBody = ProductFactory.build()

      const response = await request(app)
        .post("/products")
        .send({
          ...reqBody,
          name: ""
        })
        .set("Accept", "application/json")
      expect(response.status).toBe(400)
      expect(response.body).toEqual("name should not be empty")
    })

    test("should response with internal error 500", async () => {
      const reqBody = ProductFactory.build()
      jest.spyOn(catalogService, "createProduct").mockImplementationOnce(() => Promise.reject(new Error("error occurred on create product")))
      const response = await request(app)
        .post("/products")
        .send(reqBody)
        .set("Accept", "application/json")
      expect(response.status).toBe(500)
      expect(response.body).toEqual("error occurred on create product")
    })
  })

  describe("GET /products?limit=0&offset=0", () => {

    test("should get products", async () => {
      const randomLimit = faker.number.int({ min: 5, max: 50 })
      const products = ProductFactory.buildList(randomLimit)
      jest.spyOn(catalogService, "getProducts").mockImplementationOnce(() => Promise.resolve(products))
      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=0`)
        .send({})
        .set("Accept", "application/json")

      expect(response.body).toMatchObject(products)
    })

    test("should internal error 500", async () => {
      const randomLimit = faker.number.int({ min: 5, max: 50 })
      jest.spyOn(catalogService, "getProducts").mockImplementationOnce(() => Promise.reject(new Error("unable to get products")))

      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=0`)
        .send({})
        .set("Accept", "application/json")

      expect(response.status).toBe(500)
    })

  })

  describe("GET /products/:id", () => {

    test("should get product", async () => {
      const product = ProductFactory.build()
      jest.spyOn(catalogService, "getProduct").mockImplementationOnce(() => Promise.resolve(product))
      const response = await request(app)
        .get(`/products/${[product.id]}`)
        .send({})
        .set("Accept", "application/json")

      expect(response.body).toMatchObject(product)
    })

    test("should internal error 500", async () => {
      jest.spyOn(catalogService, "getProduct").mockImplementationOnce(() => Promise.reject(new Error("unable to get product")))

      const response = await request(app)
        .get(`/products/${faker.number.int({ min: 5, max: 5000 })}`)
        .send({})
        .set("Accept", "application/json")

      expect(response.status).toBe(500)
    })

  })

  describe("PATCH /products/:id", () => {

    test("should update product", async () => {
      const product = ProductFactory.build()
      const requestBody = {
        description: product.description,
        name: product.name
      }

      jest.spyOn(catalogService, "updateProduct").mockImplementationOnce(() => Promise.resolve(product))

      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json")
      console.log(response.body)
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(product)
    })

    test("should error validation", async () => {
      const product = ProductFactory.build()
      const requestBody = {
        name: "",
        price: product.price,
        stock: product.stock
      }
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json")

      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({
        errors: "name should not be empty"
      })
    })

    test("should internal error 500", async () => {
      jest.spyOn(catalogService, "updateProduct").mockImplementationOnce(() => Promise.reject(new Error("unable to update product")))

      const response = await request(app)
        .patch(`/products/${faker.number.int({ min: 5, max: 5000 })}`)
        .send({})
        .set("Accept", "application/json")

      expect(response.status).toBe(500)
      expect(response.body).toEqual("unable to update product")
    })

  })

  describe("DELETE /products/:id", () => {

    test("should delete product", async () => {
      const product = ProductFactory.build()

      jest.spyOn(catalogService, "deleteProduct").mockImplementationOnce(() => Promise.resolve(true))

      const response = await request(app)
        .del(`/products/${product.id}`)
        .send({})
        .set("Accept", "application/json")

      expect(response.status).toBe(200)
      expect(response.body).toBe(true)
    })

    test("should internal error 500", async () => {
      jest.spyOn(catalogService, "deleteProduct").mockImplementationOnce(() => Promise.reject(new Error("unable to delete product")))

      const response = await request(app)
        .del(`/products/${faker.number.int({ min: 5, max: 5000 })}`)
        .send({})
        .set("Accept", "application/json")

      expect(response.status).toBe(500)
    })

  })

})
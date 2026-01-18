import { jest } from "@jest/globals"

import * as cartService from "./cart.service"
import { CartRepository } from "../repositories/cart.repository"
import { CartRepositoryType } from "../types/repository.type"

describe("cart service", () => {
  let repo: CartRepositoryType

  beforeEach(() => {
    repo = CartRepository
  })

  afterEach(() => {
    repo = {} as CartRepositoryType;
  })

  describe("create cart", () => {
    test("should create cart success", async () => {
      const mockInput = {
        productId: 123
      }

      jest.spyOn(repo, "create").mockImplementationOnce(() => Promise.resolve(mockInput))

      const data = await cartService.CreateCart(mockInput, repo)

      expect(data).toMatchObject(mockInput);
    })
  })
})
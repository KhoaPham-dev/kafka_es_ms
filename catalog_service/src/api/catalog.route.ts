import express, { NextFunction, Request, Response } from 'express';
import { CatalogService } from '../services/catalog.service.ts';
import { CatalogRepository } from '../repository/catalog.repository.ts';
import { RequestValidator } from '../utils/requestValidator.ts';
import CreateProductRequest from '../dto/CreateProductRequest.dto.ts';
import { UpdateProductRequest } from '../dto/UpdateProductRequest.dto.ts';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository())

// endpoints
router.post("/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { errors, input } = await RequestValidator(CreateProductRequest, req.body)
    if (errors) {
      return res.status(400).json(errors)
    }
    const product = await catalogService.createProduct(input)

    return res.status(201).json(product)
  } catch (error) {
    const err = error as Error
    res.status(500).json(err.message)
  }

})

router.get("/products", async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 0
  const offset = parseInt(req.query.offset as string) || 0
  const data = await catalogService.getProducts(limit, offset)

  res.status(200).json(data)
})

router.get("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string) || 0
  const data = await catalogService.getProduct(id)

  res.status(200).json(data)
})

router.patch("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { errors, input } = await RequestValidator(
      UpdateProductRequest,
      req.body
    )

    if (errors) {
      return res.status(400).json({
        errors
      })
    }

    const id = parseInt(req.params.id as string) || 9
    const data = await catalogService.updateProduct({ ...input, id })

    res.status(200).json(data)
  } catch (error) {
    const err = error as Error
    return res.status(500).json(err.message)
  }
})

router.delete("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string || "0")
  const data = await catalogService.deleteProduct(id)

  res.status(200).json(data)
})

export default router;
import express, { NextFunction, Request, Response } from "express";
import * as service from "../services/cart.service.ts";
import * as repository from "../repositories/cart.repository.ts";

const router = express.Router();

const repo = repository.CartRepository;

router.get("/carts", async (req: Request, res: Response, _: NextFunction) => {
  const response = await service.GetCarts(req.body, repo)
  console.log("ABC")
  return res.status(200).json(response)
})

router.get("/carts/:id", async (req: Request, res: Response, _: NextFunction) => {
  const response = await service.GetCart(req.body, repo)
  return res.status(200).json(response)
})

router.post("/carts", async (req: Request, res: Response, _: NextFunction) => {
  const response = await service.CreateCart(req.body, repo)
  return res.status(200).json(response)
})

router.patch("/carts/:id", async (req: Request, res: Response, _: NextFunction) => {
  const response = await service.EditCart(req.body, repo)
  return res.status(200).json(response)
})

router.delete("/carts/:id", async (req: Request, res: Response, _: NextFunction) => {
  const response = await service.DeleteCart(req.body, repo)
  return res.status(200).json(response)
})

export default router;
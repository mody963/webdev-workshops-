// src/routes/product.routes.ts
import express from "express";
import { showProducts, showAddProductPage, handleAddProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", showProducts);
router.get("/add-product", showAddProductPage);
router.post("/add-product", handleAddProduct);

export default router;

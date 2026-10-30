// src/routes/product.routes.ts
import express from "express";
import { showProducts, showAddProductPage, handleAddProductPage } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", showProducts);
router.get("/add-product", showAddProductPage);
router.post("/add-product", handleAddProductPage);

export default router;

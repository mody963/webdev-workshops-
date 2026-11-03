// src/routes/product.routes.ts
import express from "express";
import { showProducts, showAddProductPage, handleAddProduct, showSingleProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", showProducts);
router.get("/product/:id", showSingleProduct)
router.get("/product/delete/:id", deleteProduct);
router.get("/add-product", showAddProductPage);
router.post("/add-product", handleAddProduct);

export default router;

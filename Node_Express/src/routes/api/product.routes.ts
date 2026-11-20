// src/routes/product.routes.ts
import express from "express";
import { getAllProducts, getSingleProduct, createProduct } from "../../controllers/api/product.controller.js";
const router = express.Router();


router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.post("/", createProduct);

// router.get("/products", showProducts);
// router.get("/product/:id", showSingleProduct)
// router.get("/product/delete/:id", deleteProduct);
// router.get("/add-product", showAddProductPage);
// router.post("/add-product", handleAddProduct);
// router.get("/products/filtered", showFilteredProducts);

export default router;

import { Product, getAllProducts, addProduct} from "../models/Product.js"
// import express from "express";
import type { Request, Response } from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function showProducts(req: Request, res: Response) {
    res.render("products", {products: getAllProducts()} )
}

function showAddProductPage(req: Request, res: Response) {
    res.render("add-product", { message: null });
}

function handleAddProductPage(req: Request, res: Response) {
    const product = req.body;
    addProduct(new Product(product.name, product.description, Number(product.price)));
    res.render("add-product", { message: "Product added successfully!" });
}


export {showProducts, showAddProductPage, handleAddProductPage}

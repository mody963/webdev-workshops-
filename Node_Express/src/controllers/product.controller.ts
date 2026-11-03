import { Product  } from "../models/Product.js"
// import express from "express";
import type { Request, Response } from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AppDataSource } from "../data-source.js";
const productRepository = AppDataSource.getRepository(Product)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function showProducts(req: Request, res: Response) {
 const products: Product[] = await productRepository.find();
 console.log(`Number of products found: ${products.length}`);
 res.render("products", { products: products });
}

function showAddProductPage(req: Request, res: Response) {
    res.render("add-product", { message: null });
}

async function handleAddProduct(req: Request, res: Response) {
 // Create a partial Product object, ready for my ORM
 const newProduct = productRepository.create({
 name: req.body.name,
 description: req.body.description,
 price: Number(req.body.price)
 })
 // Save it to the database, returns new product including the generated id
 const savedProduct = await productRepository.save(newProduct)
 console.log(`New product saved with id ${savedProduct.id}`)
 // Render the page again with a new message
 res.render("add-product", { message: "Product added" });
}



export {showProducts, showAddProductPage, handleAddProduct}

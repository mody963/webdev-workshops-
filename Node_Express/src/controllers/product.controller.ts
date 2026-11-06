import { Product  } from "../models/Product.js"
// import express from "express";
import type { Request, Response } from 'express';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AppDataSource } from "../data-source.js";
import { Category } from "../models/Category.js"; // 1. Import Category
import { Like, MoreThan, LessThan } from "typeorm";


const productRepository = AppDataSource.getRepository(Product)
const categoryRepository = AppDataSource.getRepository(Category); // 2. Get Category Repository

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function showFilteredProducts(req: Request, res: Response) {
  // 1. Expensive Guides (Price > 20 AND Name contains 'guide')
  const expensiveGuides = await productRepository.find({
    relations: { category: true },
    where: {
      price: MoreThan(20),
      name: Like("%guide%"),
    },
  });

  // 2. Cheapest product for a specific category
  const cheapestProduct = await productRepository.findOne({
    where: { category: { id: 1 } },
    order: { price: "ASC" },
  });

  // 3. Products < 10 OR Name contains 'book
  const cheapOrBookProducts = await productRepository.find({
    relations: { category: true },
    where: [
      { price: LessThan(10) },
      { name: Like("%book%") }
    ],
  });

  // Log results or render them to a view
  console.log({ expensiveGuides, cheapestProduct, cheapOrBookProducts });
  res.render("products", { products: cheapOrBookProducts });
}

async function showProducts(req: Request, res: Response) {
 const products = await productRepository.find({
 relations: { category: true },
});

 console.log(`Number of products found: ${products.length}`);
 res.render("products", { products: products });
}

function showAddProductPage(req: Request, res: Response) {
    res.render("add-product", { message: null });
}

async function handleAddProduct(req: Request, res: Response) {
  const product = req.body;
  if (product.name == "" || product.description == "" || product.price == "" || Number.isNaN(Number(product.price))) {
    res.status(400).send("product form invalid!");
    return;
  }

  // 3. Find existing "Books" category or create it if it doesn't exist yet
  let booksCategory = await categoryRepository.findOneBy({ name: "Books" });
  if (!booksCategory) {
    booksCategory = await categoryRepository.save(new Category("Books"));
  }

  // 4. Attach the category to the new product object
  const newProduct = productRepository.create({
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    category: booksCategory, // Assign the category here
  });

  const savedProduct = await productRepository.save(newProduct);
  console.log(`New product saved with id ${savedProduct.id}`);

  res.render("add-product", { message: "Product added" });
}

async function showSingleProduct(req: Request, res: Response) {
  const productId = Number(req.params.id);

  // 5. Load the relation in showSingleProduct so the category is fetched
  const product = await productRepository.findOne({
    where: { id: productId },
    relations: { category: true },
  });

  if (!product) {
    res.status(404).send("Product not found");
    return;
  }

  res.render("product", { product: product });
}

async function deleteProduct(req: Request, res: Response) {
    const paramId = parseInt(req.params.id as string);
    await productRepository.delete({ id: paramId });
    res.redirect("/products");
}

export { showFilteredProducts, showProducts, showAddProductPage, handleAddProduct, showSingleProduct, deleteProduct }



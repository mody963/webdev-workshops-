import { Product  } from "../../models/Product.js"
import type { Request, Response } from 'express';
import { AppDataSource } from "../../data-source.js";
import { Like } from "typeorm";
import { Category } from "../../models/Category.js";

const productRepository = AppDataSource.getRepository(Product)
const categoryRepository = AppDataSource.getRepository(Category)
async function getAllProducts(req: Request, res: Response){
    const filters: any = {}

    if (req.query.categoryId)
    {
      filters.category = {id: Number(req.query.categoryId)}
    }
    if (req.query.name)
    {
      filters.name = Like(`%${req.query.name}%`);
    }


    const allProducts = await productRepository.find({
      where: filters,
      relations: {category: true}
    });
    res.json(allProducts)
}

async function getSingleProduct(req: Request, res: Response) {
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
  console.log(product)
  res.json({ product: product });
}
async function createProduct(req: Request, res: Response) {
  try {
    const product = req.body;

    // Validate input
    if (
      !product.name?.trim() ||
      !product.description?.trim() ||
      product.price === null ||
      product.price === "" ||
      !Number.isFinite(Number(product.price)) ||
      Number(product.price) < 0
    ) {
      return res.status(400).json({
        message: "Product form invalid!"
      });
    }

    // Find or create Books category
    let booksCategory = await categoryRepository.findOneBy({
      name: "Books"
    });

    if (!booksCategory) {
      booksCategory = await categoryRepository.save(
        new Category("Books")
      );
    }

    // Create product
    const newProduct = productRepository.create({
      name: product.name.trim(),
      description: product.description.trim(),
      price: Number(product.price),
      category: booksCategory
    });

    // Save product
    const savedProduct = await productRepository.save(newProduct);

    console.log(`New product saved with id ${savedProduct.id}`);

    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct
    });

  } catch (error) {
    console.error("Error creating product:", error);

    return res.status(500).json({
      message: "Failed to create product"
    });
  }
}
export { getAllProducts, getSingleProduct, createProduct }



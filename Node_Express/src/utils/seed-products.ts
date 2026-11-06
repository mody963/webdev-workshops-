import { AppDataSource } from "../data-source.js";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

async function seedProducts() {
  const categoryRepository = AppDataSource.getRepository(Category);
  const productRepository = AppDataSource.getRepository(Product);

  // 1. Ensure the "Books" Category exists
  let booksCategory = await categoryRepository.findOneBy({ name: "Books" });
  if (!booksCategory) {
    booksCategory = await categoryRepository.save(new Category("Books"));
    console.log("Created 'Books' category.");
  }

  // 2. Check if the seed product already exists to avoid duplicates
  const existingProduct = await productRepository.findOneBy({ 
    name: "The Lord of the Rings" 
  });

  if (!existingProduct) {
    const seedProduct = productRepository.create({
      name: "The Lord of the Rings",
      description: "An epic high-fantasy novel written by J. R. R. Tolkien.",
      price: 29.99,
      category: booksCategory,
    });

    await productRepository.save(seedProduct);
    console.log("Seeded database with initial product!");
  } else {
    console.log("Seed product already exists.");
  }
}

export {seedProducts}

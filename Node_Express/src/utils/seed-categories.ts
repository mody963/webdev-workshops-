import { AppDataSource } from "../data-source.js";
import { Category } from "../models/Category.js";

async function seedCategories() {
 const categoryRepository = AppDataSource.getRepository(Category);
 const count = await categoryRepository.count();
 // already seeded, early return to prevent dupes
 if (count > 0) return;
 
 const books = new Category("Books");
 await categoryRepository.save(books);
 console.log("Seeded Categories");
}
export {seedCategories}
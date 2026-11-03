import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./models/Product.js";
export const AppDataSource = new DataSource({
 type: "better-sqlite3",
 database: "database.sqlite",
 synchronize: true, // automatically creates tables
 logging: true,
 entities: [Product], // list all your entity classes here
});
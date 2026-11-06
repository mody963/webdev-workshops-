import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category.js";

@Entity()
class Product {
 @PrimaryGeneratedColumn()
 id!: number;
 @Column("text")
 name: string;
 @Column("text")
 description: string;
 @Column("real")
 price: number;
@ManyToOne(() => Category, (category) => category.products)
category?: Category;
 constructor(name: string, desc: string, price: number) {
 this.name = name;
 this.description = desc;
 this.price = price;
 }
 
}



export {Product}
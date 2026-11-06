import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product.js";
@Entity()
class Category {
 @PrimaryGeneratedColumn()
 id!: number;
 @Column("text")
 name: string;
 // Relation: One category can have many products
 @OneToMany(() => Product, (product) => product.category)
 products?: Product[];
 constructor(name: string) {
 this.name = name;
 }
}
export {Category}
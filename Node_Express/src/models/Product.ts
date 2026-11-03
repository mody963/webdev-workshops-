import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
 constructor(name: string, desc: string, price: number) {
 this.name = name;
 this.description = desc;
 this.price = price;
 }
}



export {Product}
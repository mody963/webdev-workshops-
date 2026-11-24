import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    name!: string;

    @Column("text", { unique: true })
    email!: string;

    @Column("text")
    password_hash!: string;

    @Column("text")
    role!: string;

    constructor(name: string, email: string, password_hash: string, role: string) {
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.role = role;
    }
}
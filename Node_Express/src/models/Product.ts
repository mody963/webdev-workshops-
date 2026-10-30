class Product {
    name: string;
    description: string;
    price: number;

    constructor(n: string, d: string, p: number) {
        this.name = n;
        this.description = d;
        this.price = p;
    }
}

const products : Product[] = [];

function addProduct(p: Product){
    products.push(p);
}

function getAllProducts() : Product[] {
    return products;
}

export {Product, addProduct, getAllProducts}
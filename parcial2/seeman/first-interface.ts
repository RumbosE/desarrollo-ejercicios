interface IProductService{
    getProductById(productId: string): Product;
    deleteProduct(productId: string): void;
    insertProduct(product: Product): void;
    updateProduct(product: Product): void

    //and more methods...
}

class Product{}
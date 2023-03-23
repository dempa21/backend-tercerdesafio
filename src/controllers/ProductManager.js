import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = './products.json';
        this.products = [];
    }
   
      async getAll() {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      }

    getProductsFromFile = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const file = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(file);
            } else {
                await this.writeProductsFile([]);
                return 'El archivo de productos no existe. Se creará uno nuevo.';
            }
        } catch (err) {
            return `Error leyendo el archivo. Exception: ${err}`;
        }
    }
    
    writeProductsFile = async (products) => {
        return await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    }

    listProducts = async () => {
        try {
            const products = await this.getProductsFromFile();
            return products.map((product) => ({
                ...product
            }));
        } catch(err) {
            throw new Error(`Hubo un error al obtener los productos. Exception: ${err}`);
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProductsFromFile();
    
            if (products.length === 0) {
                product.id = 1;
            } else {
            const lastProduct = products[products.length - 1];
            if (lastProduct.id === undefined) {
                throw new Error(`El último producto en la lista no tiene un ID`);
            }
            product.id = lastProduct.id + 1;
            }
    
            if(!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
                throw new Error(`Debes ingresar todos campos para ingresar un nuevo producto.`);
            }
    
            if(products.some(p => p.code === product.code)) {
                throw new Error(`El código ingresado ya existe.`);
            }
            products.push(product);
            this.writeProductsFile(products);
        } catch(err) {
            throw new Error(`Hubo un error al añadir un nuevo producto. Exception: ${err}`);
        }
    }

    getProduct = async (id) => {
        try {
            if(fs.existsSync(this.path)) {
                const products = await this.getProductsFromFile();
                let index = products.find((p) => p.id === id);
                if(!index) {
                    return console.error(`No se encontró el producto con el id #${id}`);
                }
                return console.log(index);
            }
        } catch (err) {
            console.error(`Hubo un error al obtener el producto. Exception: ${err}`);
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProductsFromFile();
            let index = products.findIndex((p) => p.id === id);

            products.splice(index, 1);
            this.writeProductsFile(products);
        } catch(err) {
            console.error(`Hubo un error al eliminar el producto. Exception: ${err}`);
        }
    }

    updateProduct = async (product, id) => {
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex((p) => p.id === id);
    
            if(index === -1) {
                throw new Error(`No se encontró el producto con el id #${id}`);
            }

            if(!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
                throw new Error(`Debes ingresar todos campos para ingresar un nuevo producto.`);
            }
    
            if(products.some(p => p.code === product.code && p.id !== id)) {
                throw new Error(`El código ingresado ya existe.`);
            }

            products[index] = product;
            await this.writeProductsFile(products);
        } catch(err) {
            throw new Error(`Hubo un error al actualizar el producto. Exception: ${err}`);
        }
    }

}
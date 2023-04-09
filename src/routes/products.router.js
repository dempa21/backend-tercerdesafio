import { Router } from "express";
import { uploader } from "../utils.js";
import __dirname from './../utils.js';
import ProductManager from "../dao/dbManagers/productManager.js";
import mongoose from "mongoose";
import { productModel } from "../dao/models/products.model.js";

// import ProductManager from "../controllers/ProductManager.js";
const productManager = new ProductManager();
const router = Router();
const URL = "http://localhost:8080/images/";

router.get("/", async (req, res) => {
    const products = await productManager.findAll();
    return res.send({status: "success", payload: products});
    // try {
    //     const { limit } = req.query;
    //     res.send(products.slice(0, limit));
    // } catch(err) {
    //     return res
    //         .status(500)
    //         .send(next(err));
    // }
});

router.get("/:id", async (req, res) => {
    const id = req.params;
    const product = await productManager.getProduct();
    return res.send({status: "success", payload: product});
    // try {
    //     const { limit } = req.query;
    //     res.send(products.slice(0, limit));
    // } catch(err) {
    //     return res
    //         .status(500)
    //         .send(next(err));
    // }
});

router.post('/', async (req, res) => {
    const product = req.body;
    const pid = req.body.id;
    const createdProduct = await productManager.create(product);
    if(!createdProduct) {
        return res.status(400).send({status: "error", error: "no product"})
    }
        
    return res.send({status: "success", payload: createdProduct });

});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const updateP = {title: req.body.title, description: req.body.description};
    console.log(updateP);
    const updatedProduct = await productManager.update(id,updateP);
    console.log(updatedProduct);
    return res.send({status: "success", payload: updatedProduct });
    
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await productManager.delete(id); 
    return res.send({status: "success" });

});

// router.get("/:id", async (req, res, next) => {
//     try {
//         const product = products.find((p) => p.id === parseInt(req.params.id));
//         if(!product) return res.status(404).send({status: `Error`, error: `Producto no encontrado.`});
//         return res
//             .status(200)
//             .send(product);
//     } catch (err) {
//         return res
//             .status(500)
//             .send(next(err));
//     }
// });

// router.post("/", uploader.array("thumbnails", 3), async (req, res, next) => {
//     try {
//         const thumbnails = req.files ? req.files.map(file => `${URL}${file.filename}`) : null;
//         if(!thumbnails) {
//             return res
//                 .status(400)
//                 .send({status: `Error`, error: `No se pudo cargar ningún archivo.`});
//         }

//         const product = {
//             title: req.body.title,
//             description: req.body.description,
//             price: req.body.price,
//             status: req.body.status,
//             code: req.body.code,
//             stock: req.body.stock,
//             category: req.body.category,
//             thumbnails: thumbnails,
//         };
        
//         await productManager.addProduct(product);
//         res
//             .status(200)
//             .send({status: `Success`, response: `Producto creado.`});
//     } catch (err) {
//         return res
//             .status(500)
//             .send(next(err));
//     }
// });

// router.put("/:id", async (req, res, next) => {
//     try {
//         const id = parseInt(req.params.id);
//         const product = products.find((p) => p.id === id);

//         if(!product) {
//             return res
//                 .status(404)
//                 .send({status: `Error`, error: `No se encontró el producto con el id #${id}`});
//         }

//         const uploadProduct = {
//             id: product.id,
//             title: req.body.title ?? product.title,
//             description: req.body.description ?? product.description,
//             price: req.body.price ?? product.price,
//             status: req.body.status ?? product.status,
//             code: req.body.code ?? product.code,
//             stock: req.body.stock ?? product.stock,
//             category: req.body.category ?? product.category,
//         };

//         await productManager.updateProduct(uploadProduct, id);
//         return res
//             .status(200)
//             .send({status: `Success`, response: `Producto actualizado.`});
//     } catch (err) {
//         return res
//             .status(500)
//             .send(next(err));
//     }
// });

// router.delete("/:id", async (req, res, next) => {
//     try{
//         const product = products.find((p) => p.id === parseInt(req.params.id));
//         if(!product) return res.status(404).send({status: `Error`, error: `Producto no encontrado.`});
//         productManager.deleteProduct(product.id);
//         return res
//             .status(200)
//             .send({status: `Success`, response: `Producto eliminado.`});
//     } catch(err) {
//         return res
//             .status(500)
//             .send(next(err));
//     }
// });

export default router;
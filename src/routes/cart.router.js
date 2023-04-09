import { Router } from "express";
import CartManager from "../dao/dbManagers/cartManager.js";
import ProductManager from "../dao/dbManagers/productManager.js";
import { cartModel } from "../dao/models/carts.model.js";

const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();


router.get("/", async (req, res) => {
    const carts = await cartManager.findAll();
    return res.send({status: "success", payload: carts});

});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const cart = await cartManager.getCart(id);
    return res.send({status: "success", payload: cart});

});




router.post('/', async (req, res) => {
    const cart = req.body;
    const createdCart = await cartManager.create(cart);
    if(!createdCart) {
        return res.status(400).send({status: "error", error: "no cart"})
    }
        
    return res.send({status: "success", payload: createdCart });

});

router.post('/:cid/product/:pid', async (req, res) => {
    const id = req.params.cid;
    const pid = req.params.pid;
    const stockP = req.body.stock;

   await cartManager.updateCartByProd(id,pid,stockP);

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await cartManager.delete(); 
        
    return res.send({status: "success" });

});

router.post('/', async (req, res) => {
    const cart = req.body;
    const cid = req.body.id;
    const createdProduct = await cartManager.create(cart);
    if(!createdProduct) {
        return res.status(400).send({status: "error", error: "no cart"})
    }
        
    return res.send({status: "success", payload: createdCart });

});


export default router;
import { Router } from 'express';
const router = Router();
import productManager from "../controllers/ProductManager.js"
const contenedor = new productManager();

router.get('/', async (req,res) => {
    const productos = await contenedor.getAll();
    res.render('home', {productos})
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

router.get("/chat", (req, res) => {
    res.render("chat", { title: "chat" });
  });

export default router;
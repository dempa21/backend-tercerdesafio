import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import socket from './socket.js';

import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));

const httpServer = app.listen(8080, () => {
    console.log("Server runing at port 8080");
});

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

socket.connect(httpServer);
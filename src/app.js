import express from 'express';
import mongoose from "mongoose";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import socket from './socket.js';
import dotenv from "dotenv";
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import chatsRouter from "./routes/chats.router.js";
import messagesRouter from "./routes/messages.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const httpServer = app.listen(8080, () => {
    console.log("Server runing at port 8080");
});

// mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ly4xdtm.mongodb.net/${dbName}?retryWrites=true&w=majority`);


app.use("/api/products", productRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/carts", cartRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

socket.connect(httpServer);
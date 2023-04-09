import { Server } from 'socket.io';
import mongoose from "mongoose";
import {Msg} from './dao/models/messages.js';
import ProductManager from './controllers/ProductManager.js';
import dotenv from "dotenv";
dotenv.config();

const productManager = new ProductManager();
const products = await productManager.listProducts();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const socket = {};
let messages = [];

const mongoDB = "mongodb+srv://demparom:aCpa58lQKcs1ucRO@cluster0.ly4xdtm.mongodb.net/ecommerce?retryWrites=true&w=majority";
// const mongoDB = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ly4xdtm.mongodb.net/${dbName}?retryWrites=true&w=majority`;
console.log(dbUser);
mongoose.connect(mongoDB).catch(err => console.log(err))

socket.connect = function(httpServer) { 
    socket.io = new Server(httpServer);
    let { io } = socket;

    io.on("connection", (socket) => {
          Msg.find().then(result => {
          socket.emit('output-messages', result)
      })
      console.log('a user connected');
      socket.emit('message', 'Hello world');
      socket.on('disconnect', () => {
          console.log('user disconnected');
      });
      socket.on("chatmessage", (user, message) => {
        const messageToUpload = new Msg({ user, message });
        messageToUpload.save().then(() => {
          io.emit('messageLogs', message)
      })
      });

        console.log(`${socket.id} connected`);
        io.emit("products", products);

        socket.on('submitProduct', async (product) => {
            try {
                await productManager.addProduct(product.id);
                socket.emit("productCreated", { success: true });
            } catch (error) {
                socket.emit("productCreated", { success: false, error: error.message });
            }
        });

        socket.on('deleteProduct', async (product) => {
            try {
                await productManager.deleteProduct(product.id);
                socket.emit("productDeleted", { success: true });
            } catch (error) {
                socket.emit("productDeleted", { success: false, error: error.message });
            }
        });

        socket.on("message", (data) => {
            messages.push(data);
            io.emit("messageLogs", messages);
          });
      
          socket.on("user-autenticated", (data) => {
            socket.broadcast.emit("user-connected", data);
          });
        
    });

    
}

export default socket;
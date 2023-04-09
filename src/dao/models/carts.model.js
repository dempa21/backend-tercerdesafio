import mongoose from "mongoose";

const userCollection = "carts";

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    productos: {
        type: Array,
        required: true
    }

});

const cartModel = mongoose.model(userCollection, cartSchema);

export { cartModel };
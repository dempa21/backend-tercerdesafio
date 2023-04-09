import mongoose from 'mongoose';

const messageCollection = "messages";

const msgSchema = new mongoose.Schema({
    user: {type: String},
    message: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model(messageCollection, msgSchema);
export { Msg };
import { productModel } from '../models/products.model.js';

export default class ProductManager {
    constructor(){}

    findAll = async () => {
        try {
            const products = await productModel.find();
            return products;
        }
        catch(error) {
            console.log(error);
        }
    };

    findOne = async () => {
        try {
            const productFound = await productModel.find({_id: id});
            return productFound;
        }
        catch(error) {
            console.log(error);
        }
    };

    create = async (product) => {
        try {
            const createdProduct = await productModel.create(product);
            return createdProduct;
        } catch(error) {
            console.log(error);
        }
}

getProduct = async (id) => {
    try {
    const productFound = await productModel.find({id: id});
    return productFound;  
    }
    catch(error) {
        console.log(error);
    }
}

update = async (id, update) => {

    // const update = req.body;
    await productModel.updateOne({_id: id}, { $set: { title: update.title }});
    await productModel.updateOne({_id: id}, { $set: { description: update.description } });
    await productModel.updateOne({_id: id}, { $set: { price: update.price } });
    await productModel.updateOne({_id: id}, { $set: { status: update.status } });
    await productModel.updateOne({_id: id}, { $set: { code: update.code } });
    await productModel.updateOne({_id: id}, { $set: { stock: update.stock } });
    await productModel.updateOne({_id: id}, { $set: { category: update.category } });
    await productModel.updateOne({_id: id}, { $set: { thumbnails: update.thumbnails } });
    


    // await productModel.findOneAndUpdate({_id: id}, { $set: { title: update.title }, $set: { description: update.description }}, {
    //     returnOriginal: false
    //   });

}

delete = async (id) => {
    // const products = await productModel.find();
    // let index = products.findIndex((p) => p._id === id);
    await productModel.deleteOne({ _id: id });
}
}

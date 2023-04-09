import { cartModel } from '../models/carts.model.js';
import { productModel } from '../models/products.model.js';

export default class CartManager {
    constructor(){}

    findAll = async () => {
        try {
            const carts = await cartModel.find();
            return carts;
        }
        catch(error) {
            console.log(error);
        }
    };

    findOne = async (id) => {
        try {
            const carts = await cartModel.find({id: id});
            return carts;
        }
        catch(error) {
            console.log(error);
        }
    };

    create = async (cart) => {
        try {
            const createdCart = await cartModel.create(cart);
            return createdCart;
        } catch(error) {
            console.log(error);
        }
}
    delete = async (id) => {
        const carts = await cartModel.find();
        let index = carts.findIndex((c) => c.id === id);
        await cartModel.deleteOne(carts[index]);
    }

    getCart = async (id) => {
        try {
        const cartFound = await cartModel.find({id: id}).populate("productos");
        return cartFound;  
        }
        catch(error) {
            console.log(error);
        }
    }

    updateCart = async (filter, data) => await cartModel.updateOne(filter, data);

    updateCartByProd = async (id,pid) => {
        try {
            // const carts = await this.findAll();
            // const productIndex = carts.products.findIndex((p) => p.id === product.id);
      
            // if (productIndex !== -1) {
            //   cart.products[productIndex].quantity += product.quantity;
            // } else {

            // var exists = carts.forEach((c) => {
            //     const productIndex = c.productos.findIndex((p) => p.id === pid);});
                
            // if (productIndex !== -1) {
            //     await cartModel.updateOne(
            //         {id: id},
            //         {productos: [{_id: pid},{stock: stock =+ 1}]}) 
            // } else {
            //     await cartModel.updateOne(
            //         {id: id},
            //         {$addToSet: {productos: [{_id: pid},{stock: stockP}]}}); 
            // }});
            // function isThereAProduct(c) {
            //     c.productos.findIndex((p) => p.id === pid);
            // }

        // const cartItem = await cartModel.findOne({ id: id, 'productos.id': pid }); //Your Condition to find cart item.
        // console.log(cartItem);
   
    //     let cart = await cartModel.findOne({ id: id });
    //     console.log(cart);
    //     if (cart) {
    //         //cart exists for user
    //         let itemIndex = cart.productos.findIndex(p => p.id == pid);
    //         console.log(itemIndex);
    //         // await cartModel.updateOne({ "productos.id": pid }, {$inc: { 'productos.$.stock' : 1 }} )
    //         // await cartModel.findOneAndUpdate(cart1, {$inc: { 'productos.$.stock' : 1 }});
    //         // console.log(await cartModel.UpdateOne(cart1[itemIndex], {$inc: { 'productos.$.stock' : 1 }}));
    //         let carto = await cartModel.find({
    //             id: id,
    //             "productos.id": pid});
    //             console.log(carto)

    //         // console.log(cart['productos'][0]);
    //         // await cartModel.updateOne(cart, {$inc: { cart[itemIndex+1].stock : 1 }} )
        
    //         var collection = cartModel;
    //         console.log(collection);

    //     }
        
    //    return cart;
    const cart = await cartModel.findOne({ id: id });
    const item = await productModel.findOne({ id: pid });

    if (cart) {
        const itemIndex = cart.productos.findIndex((item) => item.id ==  pid);

        if (itemIndex > -1) {
            let product = cart.productos[itemIndex];
            console.log(product);
            product.stock += 1;
            console.log(product);

        cart.productos[itemIndex] = product;
        await cart.save(); }}
        // if (!cartItem)
        //     cart = await cartService.createCart(req.body);
        // else
        // let stockC = cartItem.stock;
        //     cart = await this.updateCart({ 'productos.id': pid, stock: stockC + 1});
        // if (!cart)
        //     return res.status(422).json({ success: false, message: 'Failed To Add Into Cart' });
        // res.json({ success: true, message: 'Item Added Into Cart' });

            // var exists = carts.some(isThereAProduct(c));
            // if(exists) {
            //     await cartModel.updateOne(
            //                 // {'id': id},
            //                 // {productos: [{'_id': pid}, {$set {stock += 1}}]})
            //                 { arrayFilters: [{ id: id }]},
            //                 { 'productos': [{'id': pid}, { $set {"producto.$[stock]": "6"}}]})
            //           } else {
            //                 await cartModel.updateOne(
            //                     {id: id},
            //                     {$addToSet: {productos: [{_id: pid},{stock: stockP}]}}); 
            //               }
            // const query = { id: id, "productos.id": pid };
            //  const updateDocument = {
            // $set: { "productos.$.stock": {$inc:  }
            // };
            //  const result = await cartModel.updateOne(query, updateDocument);

            // const update = await cartModel.updateOne(
            //     {id: id, 'productos.id': pid},
            //     {$inc: {'productos.$.stock': 1}} // Pass your increase value here
            // )
            // cartModel.updateOne(
            //     { id: id, 'productos.id': pid},
            //     { $inc:
            //        {
            //         'productos.$.stock': 1

            //        }
            //     }
            //  )

            //  await cartModel.findByIdAndUpdate({_id:id, 'productos.id': pid} , { 'productos.$.stock': { $inc: 1 } })
           
             


            // const productIndex = carts.productos.findIndex((p) => p.id === pid);
            // var exist = carts.some(function(c) {
            //     productIndex;
            //   });
            // if(exist) {
            //     await cartModel.updateOne(
            //         {id: id},
            //         {productos: [{_id: pid},{stock: stock =+ 1}]}) 
            //   }  else {
            //     await cartModel.updateOne(
            //         {id: id},
            //         {$addToSet: {productos: [{_id: pid},{stock: stockP}]}}); 
            //   }


            // await cartModel.updateOne(
            //     {id: id},
            //     {$addToSet: {productos: [{_id: pid},{stock: stockP}]}}); 
        } catch(error) {
            console.log(error);
        }
        
    }
    
    // try {
    //     const products = await this.getProductsFromFile();
    //     let index = products.findIndex((p) => p.id === id);

    //     products.splice(index, 1);
    //     this.writeProductsFile(products);
    // } catch(err) {
    //     console.error(`Hubo un error al eliminar el producto. Exception: ${err}`);
    // }
}

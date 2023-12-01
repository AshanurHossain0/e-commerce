const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
const { isValidObjectId } = require("mongoose");

const addToCart = async function (req, res) {
    try {
        const productId = req.params.productId;
        const { quantity } = req.body;
        if (!quantity) return res.status(400).send({ status: false, message: "Please provide product quantity" })
        const userId = req.token.userId;

        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Invalid product id!" });

        //GET product
        const product = await productModel.findById(productId).select('price availableQuantity -_id');

        if (!product) return res.status(404).send({ status: false, message: "Product not found" });

        if (product.availableQuantity < quantity) return res.status(400).send({ status: false, message: `${quantity > 1 ? quantity : ""} product unavailable` });
        const price = product.price;

        //Check if user has a cart
        let hasCart = await cartModel.findOne({ userId })

        //For New Cart
        if (!hasCart) {
            let data = {}
            let newItem = { productId, quantity }
            data.userId = userId;
            data.items = [newItem];
            data.totalPrice = quantity * price;
            data.totalItems = 1
            await cartModel.create(data);
        }
        //For Existing Cart
        else {
            const cartId = hasCart._id;
            const totalPrice = hasCart.totalPrice + quantity * price;

            //Check if same product already exists in the existing cart
            const productExists = hasCart.items.find(item => item.productId.toString() === productId.toString()) !== undefined;

            // If same product does not exists in the cart
            if (!productExists) {
                const newProduct = { productId, quantity }
                await cartModel.findByIdAndUpdate(cartId, { $push: { items: newProduct }, $inc: { totalItems: 1 }, $set: { totalPrice } })
            }
            // If same product exists in the cart
            else {
                await cartModel.findOneAndUpdate({ _id: cartId, "items.productId": productId }, { $inc: { "items.$.quantity": quantity }, $set: { totalPrice } })
            }
        }

        //Atlast update availableQuantity in Product and send response
        await productModel.findByIdAndUpdate(productId, { $inc: { availableQuantity: -quantity } })
        return res.status(200).send({ status: true, message: "product added to cart successfully" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getCart = async function (req, res) {
    try {
        const userId = req.token.userId;

        const cart = await cartModel.findOne({ userId }).select('-_id -userId -__v');
        return res.status(200).send({ status: true, data: (cart ? cart : {}) })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateQuantity = async function (req, res) {
    try {
        const productId = req.params.productId;
        const { quantity } = req.body;
        if (!quantity) return res.status(400).send({ status: false, message: "Please provide product quantity" })
        const userId = req.token.userId;

        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "Invalid product id!" });

        //GET product
        const product = await productModel.findById(productId).select('price availableQuantity -_id');

        if (!product) return res.status(404).send({ status: false, message: "Product not found" });

        const price = product.price;

        //Check if user has a cart
        let hasCart = await cartModel.findOne({ userId })

        // If No cart found
        if (!hasCart) return res.status(404).send({ status: false, message: "Cart not found!" })

        //If has a cart

        // Find target product
        const targetItem = hasCart.items.find(item => item.productId.toString() === productId.toString())

        //Now check if number of quantity is available or not
        if((product.availableQuantity+targetItem.quantity)<quantity) return res.status(400).send({status:false,message:`${quantity>1?quantity:""} product unavailable`});

        //Calculate total price for Updating Cart
        const totalPrice=hasCart.totalPrice+((quantity-targetItem.quantity)*price);

        //Update Cart
        await cartModel.findOneAndUpdate({ _id: hasCart._id, "items.productId": productId }, {$set: { totalPrice,"items.$.quantity":quantity } })

        //Update Product
        await productModel.findByIdAndUpdate(productId, { $inc: { availableQuantity:targetItem.quantity-quantity} })
        return res.status(200).send({ status: true, message: "Updation successful" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { addToCart, getCart,updateQuantity}
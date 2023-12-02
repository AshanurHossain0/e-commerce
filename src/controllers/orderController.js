const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const { isValidObjectId } = require("mongoose");

exports.placeOrder = async function (req, res) {
    try {
        const userId=req.token.userId;

        //get user's cart and deleting at the same db call
        const cart = await cartModel.findOneAndDelete({userId})

        if (!cart) return res.status(400).send({ staus: false, message: "Cart not found for placing order" });

        let totalQuantity = 0
        for (let i = 0; i < cart.items.length; i++) {
            totalQuantity += cart.items[i].quantity
        }

        const newOrder = {
            userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems,
            totalQuantity
        }

        //place order
        const orderData=await orderModel.create(newOrder);
        
        //update user's order
        await userModel.findByIdAndUpdate(userId, { $push: { orders:orderData._id} })

        return res.status(200).send()
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
exports.getOrder = async function (req, res) {
    try {
        const orderId=req.params.orderId;

        if(!isValidObjectId(orderId)) return res.status(400).send({status:false,message:"Invalid order id!"})

        //get order
        const order = await orderModel.findById(orderId);

        if (!order) return res.status(404).send({ staus: false, message: "Order not found" });

        return res.status(200).send({status:true,data:order})
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        // "Holds total price of all the items in the cart"
    },
    totalItems: {
        type: Number,
        required: true,
        // "Holds total number of items in the cart"
    },
    totalQuantity: {
        type: Number,
        required: true,
        // "Holds total number of quantity in the cart"
    },
    cancellable: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: "confirmed",
        enum: ["confirmed", "cancelled","shipped","delivered"],
        lowercase: true,
        trim:true
    },
    date:{
        confirmationDateAndTime:{
            type:String,
            default:""
        },
        cancellationDateAndTime:{
            type:String,
            default:""
        },
        shippingDateAndTime:{
            type:String,
            default:""
        },
        deliveryDateAndTime:{
            type:String,
            default:""
        }
    },
    paymentType:{
        type: String,
        default:"cod",
        enum: ["cod", "debitcard","upi","creditcard"],
        lowercase: true,
        trim:true
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)
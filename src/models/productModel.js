const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    category:{
        type: String,
        required: true,
        trim:true
    },
    rating:{
        type:Number,
    },
    price: {
        type: Number,
        required: true,
        trim:true
    },
    availableQuantity:{
        type:Number,
        required:true
    },
    availableSizes: {
        type: [String],
        required: true,
        enum: ["S", "XS", "M", "X", "L", "XXL", "XL"],
        trim:true,
        uppercase:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema)
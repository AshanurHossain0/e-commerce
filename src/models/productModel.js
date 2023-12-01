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
        default:0
    },
    price: {
        type: Number,
        required: true,
        trim:true
    },
    availableColor:{
        type: [String],
        required: true,
        trim:true,
    },
    // availability:{
    //     type:Boolean,
    //     default:true
    // },
    // this functionality can be handled by availableQuantity(availableQuantity=0 means not available)
    availableQuantity:{
        type:Number,
        required:true
    },
    availableSizes: {
        type: [String],
        enum: ["S", "XS", "M", "X", "L", "XXL", "XL"],
        trim:true,
    }
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema)
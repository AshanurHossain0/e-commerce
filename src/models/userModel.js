const mongoose=require('mongoose')


const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            lowercase:true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim:true
        },
        password: {
            type: String,
            required: true
        },
        orders:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }],
        address: {
            street: { type: String, required: true,lowercase:true, trim:true },
            landmark:  { type: String, required: true, lowercase:true, trim:true },
            city: { type: String, required: true, lowercase:true, trim:true },
            pincode: { type: Number, required: true }
        }
    });

module.exports=mongoose.model("User",userSchema)
const userRoute=require("./routes/userRoute")
const productRoute=require("./routes/productRoute")
const cartRoute=require("./routes/cartRoute")


const mongoose=require("mongoose");
const express=require("express");
const app=express();

app.use(express.json());

mongoose.connect("mongodb+srv://ashanur:nurasha2000@ashanurdb.x6brlcb.mongodb.net/e-commerce")
.then(_=>console.log("Database Connection Successful"))
.catch(err=>console.log(err));


app.use("/user",userRoute);
app.use("/product",productRoute);
app.use("/cart",cartRoute);

app.use("/*",(req,res)=>res.status(404).send({status:false,message:"Invalid Path"}));

app.listen(3000,(err)=>{
    if(err) console.log(err);
    else console.log("Server is connected...");
})
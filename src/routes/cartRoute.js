const express=require('express')
const router=express.Router()
const {addToCart, getCart, updateQuantity} =require("../controllers/cartController")
const {auth} =require("../middlewares/auth")

router.post("/:productId",auth,addToCart);
router.get("/",auth,getCart);
router.put("/:productId",auth,updateQuantity);


module.exports=router
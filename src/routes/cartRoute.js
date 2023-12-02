const express=require('express')
const router=express.Router()
const {addToCart, getCart, updateQuantity, removeItem} =require("../controllers/cartController")
const {auth} =require("../middlewares/auth")

router.post("/:productId",auth,addToCart);
router.get("/",auth,getCart);
router.put("/:productId",auth,updateQuantity);
router.put("/remove/:productId",auth,removeItem);


module.exports=router
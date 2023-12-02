const express=require('express')
const router=express.Router()
const {auth} =require("../middlewares/auth");
const {placeOrder, getOrder}=require("../controllers/orderController");

router.post("/",auth,placeOrder);
router.get("/:orderId",auth,getOrder);


module.exports=router
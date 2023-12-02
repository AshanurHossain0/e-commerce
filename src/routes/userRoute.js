const express=require('express')
const router=express.Router()

const {register,login, getOrderHistory} =require("../controllers/userController")
const {auth} = require("../middlewares/auth")



router.post("/register", register)
router.post("/login", login)
router.get("/orders",auth,getOrderHistory)

module.exports=router
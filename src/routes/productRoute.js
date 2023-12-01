const express=require('express')
const router=express.Router()
const {addProduct,getCategories, getProducts, getSingleProduct} =require("../controllers/productController")

router.post("/", addProduct);
router.get("/categories", getCategories);
router.get("/", getProducts);
router.get("/:productId", getSingleProduct);

module.exports=router
const { isValidObjectId } = require("mongoose");
const productModel=require("../models/productModel");

const addProduct=async function(req,res){
    try {
        // no validation for add product
        await productModel.create(req.body);
        return res.status(201).send({status:true,message:"Success"});
    } catch (error) {
        return res.status(500).send({status:false,message:error.message});
    }
}
const getCategories=async function(req,res){
    try {
        const categories=await productModel.find().distinct('category');
        return res.status(200).send({status:true,data:{categories}});
    } catch (error) {
        return res.status(500).send({status:false,message:error.message});
    }
}

const getProducts=async function(req,res){
    try {
        const products=await productModel.find({}).select('-updatedAt -createdAt -__v');
        return res.status(200).send({status:true,data:{products}});
    } catch (error) {
        return res.status(500).send({status:false,message:error.message});
    }
}

const getSingleProduct=async function(req,res){
    try {
        const productId=req.params.productId;

        if(!isValidObjectId(productId)) return res.status(400).send({status:false,message:"Invalid productId"})
        const product=await productModel.findById(req.params.productId).select('-updatedAt -createdAt -__v');
        
        if(!product) return res.status(404).send({status:false,message:"product not found"})
        return res.status(200).send({status:true,data:{product}});
    } catch (error) {
        return res.status(500).send({status:false,message:error.message});
    }
}

module.exports={addProduct,getCategories,getProducts,getSingleProduct};
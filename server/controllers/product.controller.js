import Product from "../models/product.model";
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';
import { updateWith } from "lodash";

const getAllProducts = async(req,res)=>{

    try{
        let products = await Product.find();
        return res.status(200).json(products);
    }
    catch(err){
        return res.status(500).json({error:"Could not retrieve products."})
    }
}
const getProductById = async(req,res,next,id)=>{

    try{
        let product = await Product.findById(id);
        if(!product){
            return res.status(400).json({error:"Product Not Found"})
        }
        req.profile = product
        next()
    }
    catch(err){
        return res.status(400).json({error:"Could not retrieve product."})
    }
}
const addProduct = async(req,res)=>{
    const product = new Product(req.body)
    try{
        await product.save()
        return res.status(200).json({message:"Successfully added product!"})
    }
    catch(err){
        return res.status(400).json({error:"Could not create new product.Please check your data."})
    }
}

const updateProductById = async(req,res)=>{

    try{
        const productId=req.params.id;
        const updatedData=req.body;
    
        await Product.findOneAndUpdate(productId,updatedData,{new :true});
        return res.status(200).json({message:"Product Updated Successfully"});
    }
    catch(err){
        return res.status(400).json({error:errorHandler.getErrorMessage(err)});
    }
}

const removeProductById = async(req,res)=>{
    try{
        const productId=req.params.id;
        
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({message:"Product Successfully Removed."});
    }catch(err){
        return res.status(400).json({error:errorHandler.getErrorMessage(err)});
    }
}

const removeAllProducts = async(req,res)=>{
    try{
        await Product.deleteMany({});
        return res.status(200).json({message:"All products removed successfully"});
    }catch(err){
        return res.status(500).json({error:"Error removing Products."});

    }

    

}
const findProduct = async(req,res)=>{
    try{
        const searchWord = req.query.name;
        const products = await Product.find({name:{$regex: searchWord, $options: "i"},});
        return res.status(200).json(products);
    }catch(err){
        return res.status(500).json({error:"Error finding product"});

    }

}

export default {getAllProducts, getProductById, addProduct, updateProductById, 
    removeProductById, removeAllProducts, findProduct}


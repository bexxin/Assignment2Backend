import Product from "../models/product.model.js";
import errorHandler from './error.controller.js';


const getAllProducts = async(req,res)=>{
    console.log("allproductscalled");
    try{
        let products = await Product.find();
        return res.status(200).json(products);
    }
    catch(err){
        return res.status(500).json({error:"Could not retrieve products."})
    }
}


const getProductById = async(req,res)=>{
    console.log("getProductById is called");
    try{
        const productId = req.params.id;

        let product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({error:"Product Not Found"})
        }
        return res.status(200).json(product);
        
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
    
        const updatedProduct = await Product.findByIdAndUpdate(productId,updatedData,{new :true});
        
    
    if(!updatedProduct){
        return res.status(400).json({error:"Product Not Found"})}
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


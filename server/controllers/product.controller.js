import Product from "../models/product.model";

const getAllProducts = async(req,res)=>{

    try{
        let products = await Product.find();
        return res.status(200).json(products);
    }
    catch(err){
        return res.status('500').json({error:"Could not retrieve products."})
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
        return res.status('400').json({error:"Could not retrieve product."})
    }
}
const addProduct = async(req,res)=>{
    const product = new Product(req.body)
    try{
        await product.save()
        return res.status(200).json({message:"Successfully added product!"})
    }
    catch(err){
        return res.status('400').json({error:"Could not create new product.Please check your data."})
    }
}

const updateProductById = async(req,res)=>{

    try{
        let products = await Product.find();
        return res.status(200).json(products);
    }
    catch(err){
        return res.status('500').json({error:"Could not retrieve products."})
    }
}

export default {getAllProducts, getProductById, addProduct, updateProductById, removeProductById, removeAllProducts, findProduct}


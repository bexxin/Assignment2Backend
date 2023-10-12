import mongoose from 'mongoose'
import category from './category.model.js';
const ProductSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:category, required:true}
});
const Product = mongoose.model("Product",ProductSchema);
export default Product;
import express from 'express'
import productController from '../controllers/product.controller.js'

const router = express.Router();
//CRUD operations
router.route('/api/products')
.get(productController.getAllProducts)
.get(productController.findProduct)
.post(productController.addProduct)
.delete(productController.removeAllProducts)


router.route('/api/product/:id')
.get(productController.getProductById)
.put(productController.updateProductById)
.delete(productController.removeProductById)

export default router;


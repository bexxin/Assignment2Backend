import express from 'express'
import productController from '../controllers/product.controller.js'

const router = express.Router();
//CRUD operations
router.route('/api/products')
.get(productController.getAllProducts)
.post(productController.addProduct)
.delete(productController.removeAllProducts)


router.route('/api/products/id/:id')
.get(productController.getProductById)
.put(productController.updateProductById)
.delete(productController.removeProductById)

router.route('/api/products/find')
.get(productController.findProduct)

export default router;


const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const verifyToken = require('../config/token');

//Add New Product
router.post('/add', verifyToken, productController.newProduct);

//Find All Products
router.get('/findAll', productController.allProducts);

//Find User Products
router.get('/userProducts/:idUser', verifyToken, productController.userProducts);

//Delete One Product
router.delete('/delete/:idProduct', verifyToken, productController.deleteProduct);

//Find One Product
router.get('/findOne/:idProduct', verifyToken, productController.findOne);

//Update One Product
router.put('/update/:idProduct', verifyToken, productController.updateProduct);

//Add comment
router.post('/addComment', verifyToken, productController.addComment);

module.exports = router;

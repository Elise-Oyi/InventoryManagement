const express = require("express")
const { addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct} = require("../controller/productController")


const router = express.Router()


// -- add task route
router.post('/product',addProduct)
// --get task 
router.get("/products", getProducts)
//-- get one task
router.get("/product/:id",getProduct)
//-- update
router.put("/update/:id",updateProduct)
//-- delete
router.delete("/delete/:id",deleteProduct)

module.exports = {
    routes: router
}
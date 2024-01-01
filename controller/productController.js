"use strict";

const ProductsDb = require("../firebaseConfig/firebase");
const Product = require("../models/product");

//-- add product
const addProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await ProductsDb.doc().set(data);
    res.send("Product added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//-- get all products
const getProducts = async (req, res, next) => {
    try {
        const data = await ProductsDb.get();
        const ProductList = [];

        if (data.empty) {
            res.status(404).send("No products available!");
        } else {
            data.forEach((doc) => {
                const productData = doc.data();
                const product = new Product({
                    id: doc.id,
                    ...productData
                });

                ProductList.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                });
            });
            res.send(ProductList);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};


//-- get one product
const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductsDb.doc(id);
    const data = await product.get();

    if (!data.exists) {
      res.status(404).send("No product available!");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//-- update product
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = req.body;
    const product = await ProductsDb.doc(id);

    await product.update(data);
    res.send("product updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//-- delete product
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = ProductsDb.doc(id);

    await product.delete();
    res.send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

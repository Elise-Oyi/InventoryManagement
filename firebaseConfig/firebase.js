const firebase = require("firebase")
const config = require("./config")

firebase.initializeApp(config.firebaseConfig)

const db = firebase.firestore()

const ProductsDb = db.collection("products")

module.exports = ProductsDb
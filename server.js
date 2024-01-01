'use strict'
const express = require("express")
const cors = require("cors")
const config = require("./firebaseConfig/config")
const productRoutes = require("./routes/productRoutes")


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", productRoutes.routes)
app.get("/",(req,res)=>{
    res.send("Hello Amazin Trips... Happy new year")
})


app.listen(config.port,()=>{
    console.log("server is listening on port ", config.port)
})
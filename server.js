const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const authRoutes = require("./routes/authRoute")
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const connectDB = require("./config/db");
const cors = require("cors")
const path = require("path")
// configure env
dotenv.config();

//rest object
const app = express();

//database config
connectDB();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

// routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product", productRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send(
        '<h1>Welcome to ecommerce website</h1>'
    )
})

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//port
// const PORT = 8080
const PORT = process.env.PORT || 8080; 

//run
app.listen(PORT, ()=>{
    // console.log(`server running on ${PORT}`.bgCyan.white);
    //or
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
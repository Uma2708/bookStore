const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDB database ${conn.connection.host}`.bgYellow.black);
    }
    catch(error){
        console.log(`Error in mongoDB ${error}`.bgRed.white);
    }
}

module.exports =  connectDB;
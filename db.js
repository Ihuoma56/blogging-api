const mongoose = require("mongoose")
const connectMongoDB=()=>{
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on("connected", ()=>{
        console.log("successfully connected to mongodb")
    })
    mongoose.connection.on("error", (err)=>{
        console.log("unable to connect to mongodb", err)
    })
}
module.exports = connectMongoDB
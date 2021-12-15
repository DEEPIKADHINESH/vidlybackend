const express=require("express");
const app=express();
const courses=require("./routes/courses")
const home=require("./routes/home")
const customers=require("./routes/customers")
const mongoose=require("mongoose")
app.use(express.json())
app.use("/api/genres",courses)
app.use("/api/customers",customers)
mongoose.connect("mongodb://localhost/vidlybyme")
.then(()=>console.log("connected to db"))
.catch((err)=>console.error("couldnot connect to db",err))


const port=5000;     
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})
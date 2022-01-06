const mongoose=require("mongoose")
const config=require("../config/default.json")
// module.exports=function(){
//     mongoose.connect("mongodb://localhost/vidlybyme")
// .then(()=>console.log("connected to db"))
// .catch((err)=>console.error("couldnot connect to db",err))
// }
//if we use wimston then code belike
const winston=require("winston")
module.exports=function(){
   
    mongoose.connect("mongodb://localhost/vidlybyme")
.then(()=>winston.info(`connected to db `))
}
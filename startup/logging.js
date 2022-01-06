const winston=require("winston")
require("winston-mongodb")
require("express-async-errors")
module.exports=function(){
    process.on("uncaughtException",(ex)=>{
        console.log("we caught uncaught exception")
        winston.error(ex.message,ex)
        process.exit(1)
    })//used to get sync exception which is not caught by error module
    process.on("unhandledRejection",(ex)=>{
        console.log("we got unhandled rejection")
        winston.error(ex.message,ex)
        process.exit(1)//exit is used to terminate the entire process if some error occured
    })//used to get asu=ync exception which is not caught by error module
    winston.add(winston.transports.File,{filename:"logfile.log"})
    //used for storing error in logfile
    winston.add(winston.transports.MongoDB,{db:"mongodb://localhost/vidlybyme"})
    //storing error in mongodb
    //throw new Error("wont allow to connect")
    // const p=Promise.reject(new Error("something filed"))
    // p.then(()=>console.log("done"))
    //to add the error msg in console
}
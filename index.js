const express=require("express");
const app=express();
const winston=require("winston")
require("./startup/logging")()
require("./startup/routes")(app)
require("./startup/db")()
require("./startup/validation")()
const port=5000;     
const server=  app.listen(port,()=>
 winston.info(`server started at port ${port}`)
)
module.exports=server;

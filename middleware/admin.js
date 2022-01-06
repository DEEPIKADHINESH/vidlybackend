function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).send("Forbidden User")
    next()
}
module.exports=admin;
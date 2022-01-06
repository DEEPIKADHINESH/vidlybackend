function asyncMiddleware(handler){
    return async(req,res,next)=>{
      try{
        await handler(req,res)
      }
      catch(ex){
        next(ex)
      }
    }
  }
  module.Middleware=asyncMiddleware;
  //tthis module is try block but using express-async-errors wee ca do it authomatically
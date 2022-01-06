const mongoose=require("mongoose")
const {genreSchema}=require("../modules/genres")
const Joi=require("joi")
const moviesSchema=new mongoose.Schema({
    title:
        {type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true
    },
   genre:
         {type:genreSchema,
          required:true} ,
    numberInStock:
            {type:Number,
             required:true,
             min:0,
             max:255
            },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
})
const Movie=mongoose.model("Movie",moviesSchema)
// async  function addMovie(){
// const movie=new Movie({
//     title:"Terminator",
//     genre:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"genre",
//         name:"sci-fi"
//     },
//     numberInStock:1,
//     dailyRentalRate:2
// })
// const result=await movie.save();
// console.log(result)
// }   
// addMovie();
function validateMovies(movie){
    const schema={
        title:Joi.string().min(5).max(50).required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required(),
        genreId:Joi.objectId().required()}
        return Joi.validate(movie,schema)
}
exports.validate=validateMovies;
exports.Movie=Movie;
const request=require("supertest")
let server;
const {Rental}=require("../../modules/rentals");
const mongoose=require("mongoose");

describe("/api/returns",()=>{
    let customerId
let movieId
let rental
   beforeEach(async()=>{server=require("../../index"),
 customerId=mongoose.Types.ObjectId(),
 movieId=mongoose.Types.ObjectId(),
    rental=new Rental({
           customer:{
               _id:customerId,
               name:"12345",
               phone:"12345"
           },
          movie:{
                _id:movieId,
                title:"12345",
               dailyRentalRate:2
}

 }),
 await rental.save()
})
    afterEach(async()=>{
        server.close();
       await Rental.remove({})
    })
    it("should return 401 if client is not logged in",async()=>{
const res=await request(server).post("/api/rentals").send({customerId:customerId,movieId:movieId})
expect(res.status).toBe(401)

    })
})
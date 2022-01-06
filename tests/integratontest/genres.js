const {Genre}=require("../../modules/genres")
const {User}=require("../../modules/users")
let server;
const request=require("supertest");
const mongoose = require("mongoose");

describe("/api/genres",()=>{
beforeEach(()=>{server=require("../../index");});
afterEach(async()=>{server.close();
await Genre.remove({})
})
describe("GET/",()=>{
    it("should return the genres",async()=>{
     await Genre.collection.insertMany([{name:"genre1"},{name:"genre2"}]) 
      const res=await  request(server).get("/api/genres")
      expect(res.status).toBe(200);
     //expect(res.body.length).toBe(2)
      expect(res.body.some(g=>g.name==="genre1")).toBeTruthy()
    })
})
})
describe("GET BY ID",()=>{
//   it("should return genre when valid id is passed",async()=>{
//     const genre=new Genre({name:"genre1"})
//     await genre.save()
//     const res=await request(server).get("/api/genres"+genre._id)
//  // expect(res.status).toBe(200)
//     //expect(res.body).toHaveProperty("name",genre.name)
//   } )

it("should return 404 if invaid id is passed",async()=>{
  const res=await request(server).get("/api/genres/1")
  expect(res.status).toBe(404)
})
describe("POST/",()=>{
  it("should return 401 if client is not logged in",async()=>{
   const res= await request(server).post("/api/genres").send({name:"genre1"})
   expect(res.status).toBe(401)
  })
  it("should return 400 is input is less than5 character",async()=>{
const token=new User().generateAuthToken()
const res=await request(server).post("/api/genres")
.set("x-auth-token",token).send({name:"123"})
expect(res.status).toBe(400)
  })
  it("should return 400 if the input is greater than 50",async()=>{
    const token=new User().generateAuthToken()
    const name=new Array(52).join("a")
    const res=await request(server).post("/api/genres")
    .set("x-auth-token",token).send({name:name})
    expect (res.status).toBe(400)
  })
  it("should save the genre if the valid input is passed",async()=>{
    const token=new User().generateAuthToken();
   const res= await request(server).post("/api/genres").set ("x-auth-token",token).send({name:"genre1"})
   const genre=await Genre.find({name:"genre1"})
   expect(genre).not.toBeNull()
  })
  it("should return genre if it is valid",async()=>{
    const token=new User().generateAuthToken()
    const res=await  request(server).post("/api/genres").set("x-auth-token",token)
    .send({name:"genre1"})
    expect(res.body).toHaveProperty("_id")
    expect(res.body).toHaveProperty("name","genre1")
  })
})
})
describe("put/:id",()=>{
  let genre;
  let name;
  let newName;
  let token;
  let id;
  const exec=async()=>{
    return await request(server).put("/api/genres"+id).set("x-auth-token",token)
    .send({name:newName})
  }
  beforeEach(async()=>{
    genre=new Genre({name:"genre1"})
  await  genre.save();
  token=new User().generateAuthToken();
   id =genre._id;
   newName="update"
  }
)
  it ("should retun 401 if client is not  logged in",async()=>{
    token="";
    const res=await exec()
    expect(res.status).toBe(401)
  })
  it("it should return 400 if the genre is less than 5 characters",async()=>{
    token="1234";
    const res=await exec();
    expect(res.status).toBe(400)
  })
  it("should return 400 if the genre is greater than 50 character",async()=>{
    newArray=new Array(52).join("a");
    const res=await exec()
    expect(res.status).toBe(400)
  })
  it("should return 404 if the id is invalid",async()=>{
    id="1"
    const res=await exec();
    expect(res.status).toBe(404)
  })
  it("should return 404 when the id is invalid in mongodb",async()=>{
    id=mongoose.Types.ObjectId()
    const res=await exec();
    expect(res.status).toBe(404)
  })
  it("should update the genre if the id is true",async()=>{
    await exec();
    const updateGenre=await genre.findById(genre._id)
    expect(updateGenre.genre).toBe(newName)
  })
  it("should return the updated genre if it is valid",async()=>{
   const res= await exec()
  expect(res.body).toHaveProperty("_id")
  expect(res.body).toHaveProperty("name",newName)
  })
})

describe("delete/:id",()=>{
  let token;
  let genre;
  let id;
  const exec=async()=>{
    return await request(server).delete("/api/genres"+id).set("x-auth-token",token).send()
  }
  beforeEach(async()=>{
    genre=new Genre({name:"genre1"})
    await genre.save();
    id=genre._id;
    token=new User({isAdmin:true}).generateAuthToken()
  })
  it("should return 401 if the client is not logged in",async()=>{
    token="";
    const res=await exec();
    expect(res.status).toBe(401)
  })
  it("should return 403 if the user is not admin",async()=>{
    token=new User({isAdmin:false}).generateAuthToken()
    const res=await exec();
    expect(res.status).toBe(403)

  })
  it("should return 404 if the user id s not valid",async()=>{
    id="qee";
    const res=await exec();
    expect(res.status).toBe(404)
  })
  it("should return 404 if no genre is present with the given valid id",async()=>{
    id=mongoose.Types.ObjectId()
    const res=await exec();
    expect(res.status).toBe(404)
  })
  it("should delete the genre if the valid id is passed",async()=>{
    const res=await exec();
   const genreinDb=await  Genre.findById(_id)
   expect(genreinDb).toBeNull()
  })
  it("should return the removed movie genre",async()=>{
    const res=await exec();
    expect(res.body).toHaveProperty("name",genre.name)
  })
})
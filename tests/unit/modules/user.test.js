const {User}=require("../../../modules/users")
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const config=require("../../../config/test.json")
const { items } = require("joi/lib/types/array");
//const { describe } = require("joi/lib/types/lazy");
describe("user.generateAuthToken",()=>{
    it("should return a valid jwt token",()=>{
        const payload={_id:new mongoose.Types.ObjectId().toHexString(),isAdmin:true}
        const user=new User(payload)
        const token=user.generateAuthToken();
        const decoded=jwt.verify(token,"jwtPrivateKey")
        expect(decoded).toMatchObject(payload)
    })
})
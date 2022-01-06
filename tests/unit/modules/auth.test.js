
const mongoose = require("mongoose");
const auth=require("../../../middleware/auth");
const {User}=require("../../../modules/users")
describe("auth middleware",()=>{
    it("should populate req.user with payload of json web token",()=>{
        const user={_id:mongoose.Types.ObjectId().toHexString()}
        const token=new User(user).generateAuthToken()
        const req={
            header:jest.fn().mockReturnValue(token)
        }
        const res={}
        const next=jest.fn();
        auth(req,res,next);
        expect(req.user).toMatchObject(user)
    })
})
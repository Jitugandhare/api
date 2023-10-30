const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    confirm_pass:String
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}
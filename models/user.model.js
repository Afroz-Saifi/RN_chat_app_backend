const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:{
        unique:true,
        type:String
    },
    name:String,
    password:String,
    role:String,
    verify:Boolean
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}
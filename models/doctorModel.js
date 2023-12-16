const mongoose=require("mongoose");
const JWT=require('jsonwebtoken');

const doctorSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

doctorSchema.methods.getSignedJwtToken=function(){
    return JWT.sign({id:this._id},'secret',{
        expiresIn:'120m'
    });
};


const Doctor=mongoose.model('Doctor',doctorSchema);

module.exports=Doctor;
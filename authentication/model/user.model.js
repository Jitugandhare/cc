const mongoose=require('mongoose');

const userSchema=new Schema({
    name: { type: String, required: true } 
})



const UserModel=mongoose.model('User',userSchema);

module.exports=UserModel;
const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    password:String,
    address:String,
    chatHistrory:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[],
        ref:'Chat',
    }
});
const User= mongoose.model('User',userSchema);
module.exports=User;
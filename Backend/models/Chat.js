const mongoose = require('mongoose');
const chatSchema= new mongoose.Schema({
    name:String,
    participant:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[],
        ref:'User',
    },
    messages:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[],
        ref:'Message',
    }
});
const Chat= mongoose.model('Chat',chatSchema);
module.exports=Chat;
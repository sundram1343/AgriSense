const mongoose = require('mongoose');
const messageSchema= new mongoose.Schema({
    input:{
        type:String,
        enum: ['text', 'image', 'video', 'audio', 'file', 'location'],
        default: 'text'
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String,
        default:''
    },
    mediaUrl:{
        type:String,
        default:null,
    },
    sent:Boolean,
    timestamp:{
        type:Date,
        default:Date.now,
    },
    received:Boolean,
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat',
    }
});
const Message= mongoose.model('Message',messageSchema);
module.exports=Message;
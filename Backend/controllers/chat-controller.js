const Chat=require('../models/Chat')
const Message=require('../models/messages')
const User=require('../models/user-model')
const usermessage=async(req,res)=>{
    try{
        const {ChatId,userId,text,media}=req.body;
        const chat = await Chat.findById(ChatId);
        const user=await User.findById(userId);
        if(!chat){
            chat=new Chat({
                name:'New Chat',
                participants:userId
            });
            await Chat.save();
        }
        const newmessage=new Message({
            chatId:ChatId,
            media:media,
            received:false,
            content:text
        });
        await newmessage.save();
        chat.message.push(newmessage._id);
        await chat.save();
        user.chatHistrory.push(chatId);
        await user.save();
        res.status(201).json(newMessage)
    }
    catch(error){
        res.status(400).json('Server error');
    }
}
const responsemessage=async(req,res)=>{
    try{
        const response=req.body.message;
        const message=new Message({
            chatId:req.body.chatId,
            received:true,
            content:req.body.text
        })
        await message.save();
        return res.status(200).json(message);
    }catch(error){
        return res.status(400).json('Server Error');
    }
}
module.exports={usermessage,responsemessage};
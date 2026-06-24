const chat=require('../models/Chat')
const message=require('../models/messages')
const createchat=async(req,res)=>{
    const chatId = uuidv4();
    const user_id=req.body.user_id
    const chat = { chatId, participants, createdAt: new Date() };
    res.json(chat);
}
const usermessage=async(req,res)=>{
    const messageid=uuidx4()
    const message=new message({
        messageid,
        chatId=req.body.chatId,
        media=req.body.media,
        received=false,
        content=req.body.text
    });
}
module.exports={createchat,usermessage};
const express=require('express')
const router=express.Router()
const {usermessage,responsemessage}=require('../controllers/chat-controller')
router.post('/usermessage',usermessage)
router.post('/responsemessage',responsemessage)
module.exports=router;
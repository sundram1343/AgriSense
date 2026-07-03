const express=require('express');
const router=express.Router();
const {registereduser,newuser}=require('../controllers/authcontroller');
router.post('/register',registereduser);
router.post('/newuser',newuser);
module.exports=router;
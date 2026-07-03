const express=require('express');
const router=express.Router();
const protect=require('../middleware/authmiddleware');
const {getdata}=require('../controllers/user-controller');
router.get('/getdata',protect,getdata);
module.exports=router;
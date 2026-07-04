const express=require('express');
const rourter=express.Router();
const upload=require('../middleware/uploadmiddleware')
const {diseasedetection,wateringreminder,set_watering_alarm,solution}=require('../controllers/plant-controller');
rourter.post('/diseasedetection',upload.single('image'),diseasedetection);
rourter.post('/wateringreminder',wateringreminder);
rourter.post('/set_watering_alarm',upload.single('image'),set_watering_alarm);
rourter.post('/solution',solution);
module.exports=rourter;
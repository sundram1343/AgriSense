const express=require('express');
const rourter=express.Router();
const {diseasedetection,wateringreminder,set_watering_alarm,solution}=require('../controllers/plant-controller');
rourter.post('/diseasedetection',diseasedetection);
rourter.post('/wateringreminder',wateringreminder);
rourter.post('/set_watering_alarm',set_watering_alarm);
rourter.post('/solution',solution);
module.exports=rourter;
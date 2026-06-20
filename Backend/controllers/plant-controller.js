const plant = require('../models/plant-model');
const axios = require('axios');
const {get_location}=require('../utils/Location');
const {average_watering}=require('../utils/soli_map');
const {water_check}=require('../utils/water_check');
const diseasedetection=async(req,res)=>{
    try{
        const image=req.body.image;
        const result=await axios.post(process.env.prediction_api_url,{image:image});
        if(result.disease==='')
        {
            return res.status(200).json({message:"No disease detected"});
        }
        const plantinfo=await axios.post(`https://my-api.plantnet.org/v2/varieties?prefix=Ros&api-key=${process.env.PlantNet_API}`,{image:req.body.image});
        const newplant=new plant({
            name:plantinfo.data.common_name,
            disease:result.data.disease,
            description:plantinfo.data.description,
        });
        await newplant.save();
        
            return res.status(200).json({message:"Disease detected",disease:result.data.disease})
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
const wateringreminder=async(req,res)=>{
    try{
        const next_watering_time =await plant.findById(id).select('nextWatering');
        const updated_watering= water_check(next_watering_time);
        await plant.findByIdAndUpdate(id,{nextWatering:updated_watering});
        await plant.save();
        if(updated_watering-new Date()===0){
            return res.status(200).json({message:'Watering day is today'});
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
const set_watering_alarm=async(req,res)=>{
    const user_input=req.body;
    const plantinfo=await axios.post(`https://my-api.plantnet.org/v2/varieties?prefix=Ros&api-key=${process.env.PlantNet_API}`,{image:user_input.image}); 
    let lat,lon;//lan=latitude, lon=longitude
    get_location(lon,lat);
    const soil_info =await axios.get(`https://www.kaegro.com/farms/api/soil?lat=${lat}&lon=${lon}`);
    const soil_type=soil_info.data.soil_type;
    const average_watering_time=average_watering[soil_type];
    const last_watered=user_input.last_watered;
    const next_watering=last_watered+average_watering_time;
    const newplant= new plant({
        name:plantinfo.common_name,
        last_watered:last_watered,
        nextWatering:next_watering
    });
}
module.exports={diseasedetection, wateringreminder,set_watering_alarm};
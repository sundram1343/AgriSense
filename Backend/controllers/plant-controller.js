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
        const plantinfo=await axios.get(`https://my-api.plantnet.org/v2/varieties?prefix=Ros&api-key=${process.env.PlantNet_API}`,{image:req.body.image});
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
        let lat,lon;//lan=latitude, lon=longitude
        get_location(lon,lat);
        const soil_info =await axios.get(`https://www.kaegro.com/farms/api/soil?lat=${lat}&lon=${lon}`);
        const soil_type=soil_info.data.soil_type;
        const next_watering_time =await plant.findById(id).select('nextWatering');
        const updates_watering= water_check(next_watering_time);
        await plant.findByIdAndUpdate(id,{nextWatering:updates_watering});
        await plant.save();
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports={diseasedetection, wateringreminder};
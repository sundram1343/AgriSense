const plant = require('../models/plant');
const axios = require('axios');
const {get_location}=require('../utils/Location');
const {average_watering}=require('../utils/soli_map');
const {water_check}=require('../utils/water_check');
const {diseaseSolutions}=require('../utils/disease-solution')
const diseasedetection=async(req,res)=>{
    try{
        const image=req.body.image;
        const result=await axios.post(process.env.prediction_api_url,{image:image});
        if(result.data.disease === '')
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
        const id=req.body.id;
        const next_watering_time =await plant.findById(id).select('nextWatering');
        const updated_watering= water_check(next_watering_time);
        await plant.findByIdAndUpdate(id,{nextWatering:updated_watering});
        await plant.save();
        if(updated_watering===new Date){
            return res.status(200).json({message:'Watering day is today'});
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
const set_watering_alarm=async(req,res)=>{
    const user_input=req.body;
    const plantinfo=await axios.post(`https://my-api.plantnet.org/v2/varieties?prefix=Ros&api-key=${process.env.PlantNet_API}`,{image:user_input.image}); 
    const { lat, lon } = await get_location();
    const soil_info =await axios.get(`https://www.kaegro.com/farms/api/soil?lat=${lat}&lon=${lon}`);
    const soil_type=soil_info.data.soil_type;
    const average_watering_time=average_watering.get(soil_type);
    const last_watered=user_input.last_watered;
    const next_watering = new Date(last_watered);
    next_watering.setDate(
        next_watering.getDate() + average_watering_time
    );
    const newplant= new plant({
        name: plantinfo.data.common_name,
        last_watered:last_watered,
        nextWatering:next_watering
    });
    await newplant.save();
}
const solution=async(req,res)=>{
    try{
        const { disease } = req.body;
        const solution = diseaseSolutions.get(disease);
        return res.status(200).json({solution});
    }
    catch(error){
        return res.status(300).json(error.message);
    }
}
module.exports={diseasedetection, wateringreminder,set_watering_alarm,solution};
const plant = require('../models/plant-model');
const axios = require('axios');
const averageWtaeringTime=new Map([
    ['Sandy Soil',2],
    ['Silty Soil',4],
    ['Loamy SOil',5],
    ['Clay Soil',7],
]);
const diseasedetection=async(req,res)=>{
    try{
        const image=req.body.image;
        const result=await axois.post(process.env.prediction_api_url,{image:image});
        const plantinfo=axois.get(`https://my-api.plantnet.org/v2/varieties?prefix=Ros&api-key=${process.env.PlantNet_API}`,{image=req.body.image});
        const newplant=new plant({
            name:plantinfo.data.common_name,
            disease:result.data.disease,
            description:plantinfo.data.description,
        });
        await newplant.save();
        if(result.disease==='')
        {
            res.status(200).json({message:"No disease detected"});
        }
        else{
            res.status(200).json({message:"Disease detected",disease:result.data.disease});
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const getlongs=(lon,lat)=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        lon=position.coords.longitude;
        lat=position.coords.latitude;
    });
}
const water_check=(watering_time,condition,)=>{
    const current_time=new Date();
    if(waterng_time-current_time===0){
        if(condition==='Rain'||condition==='Thunderstrom')
        {
            watering_time.setDate(watering_time.getDate()+1);
        }
        else{
            watering_time.setDate(watering_time.getDate());
        }
    }
}
const wateringreminder=async(req,res)=>{
    try{
        const plantinfo=await axois.get(`https://my-api.plantnet.org/v2/varieties?prefix=Ros&api-key=${process.env.PlantNet_API}`,{image=req.body.image});
        const plantname=plantinfo.data.common_name;
        const plant=await plant.findOne({name:plantname});
        const lon,lat;
        getlongs(lon,lat);
        const soil_type= await axois.get(`https://www.kaegro.com/farms/api/soil?lat=${lat}&lon=${lon}`);
        const weather=await axois.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OpenWeather_API}`);
        const watering_tinme=await plant.findById(plant._id).select('nextWatering');
        water_check(watering_time,weather.weather[0].main,averaege_watering_time);
        const updated_plant=await plant.findByIdAndUpdate(plant._id,{nextWatering:watering_time},{new:true});
        await updated_plant.save();
        if(watering_time-new Date()===0){
            res.status(200).json({message:"Time to water your plant"});
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={diseasedetection, wateringreminder};
const plant = require('../models/plant-model');
const diseasedetection=async(req,res)=>{
    try{
        const image=req.body.image;
        const result=await axois.post(process.env.prediction_api_url,{image:image});
        const plantinfo=axois.get(`https://perenual.com/api/v2/species/details/[ID]?key=${process.env.Perenual_API}`);
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

const wateringreminder=async(req,res)=>{
    try{
        const plantinfo=axois.get(`https://perenual.com/api/v2/species/details/[ID]?key=${process.env.Perenual_API}`,{image=req.body.image});
        const plantname=plantinfo.data.common_name;
        const {plantId, wateringTime} = req.body;
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports={diseasedetection, wateringreminder};
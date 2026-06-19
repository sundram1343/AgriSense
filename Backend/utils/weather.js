const axios=require('axios');
const get_condition=(lat,lon)=>{
    try{
       const condition = await axios.get(`https://api.openweathermap.org/data/4.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
       return condition;
    }
    catch(err){
        return "";
    }
}
get
module.export={get_condition}
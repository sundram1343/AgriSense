const {get_location}= require('./Location')
const {get_condition}=require('./weather'); 
const water_check=(watering_time)=>{
    const current_time=new Date();
    let lat,lon;
    get_location(lon,lat);
    const weather_info=get_condition(lat,lon);
    const condition=weather_info.weather[0].main;
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
module.export={water_check}
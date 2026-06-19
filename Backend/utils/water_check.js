const water_check=(watering_time)=>{
    const current_time=new Date();
    let lat,ln
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
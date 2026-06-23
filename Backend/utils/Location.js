const get_location=(lon,lat)=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        lon=position.coords.longitude;
        lat=position.coords.latitude;
    });
}
module.exports={get_location}
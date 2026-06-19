const get_location=(lon,lat)=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        lon=position.coords.longitude;
        lat=position.coords.latitude;
    });
}
module.export={get_location}
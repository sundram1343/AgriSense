const mongoose=require('mongoose');
const plantSchema=new mongoose.Schema({
    name:String,
    lastWatered:Date,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    nextWatering:Date,
    diesease:String,
    description: String,
});
const Plant=mongoose.model('Plant',plantSchema);
module.exports=Plant;
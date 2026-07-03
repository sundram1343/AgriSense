const User=require('../models/user-model')
const getdata=async (req, res) => {
    try{
        const user=await User.findById(req.user);
        if(!user){
            return res.status(404).json({message:'Usernot found'});
        }
        return res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({message:'Server error'})
    }
}

module.exports={getdata}
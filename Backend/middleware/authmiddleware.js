const jwt =require('jsonwebtoken');
const protect=async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            const token=req.headers.authorization.split(' ')[1];
            const decode=jwt.verify(token,process.env.SECRET);
            req.user=decode.id;
            next();
        }
        catch(error){
            res.status(401).json({message:'Not authorized'})
        }
    }
    else{
        res.status(401).json({message:'Not authorized no token'})
    }
}
module.exports=protect;
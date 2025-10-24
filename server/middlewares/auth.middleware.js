

const protect = async (req,res,next) =>{
    const token = req.headers.authorization
    if(!token){
    return res.status(401).json({message:'unauthorized'});
}

try{
    const decoded = JsonWebTokenError.verify(token, process.env.JWT_SECRET)
    req.userId =  decoded.userId;
    next()
}catch(error){
    return res.status(401).json({message : "Unauthorized"})
}
}
export default protect
module.exports = (req, res, next)=>{
    const pID = req.userData.pID;
    if(pID === 1){
        next();
    }
    else{
        return res.status(401).json({
            message: "Only admin can delete users"
        })
    }
};
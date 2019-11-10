module.exports = (req, res, next)=>{
    const userID = req.userData.userID;
    if(userID === 1){
        next();
    }
    else{
        return res.status(401).json({
            message: "Only admin can delete users"
        })
    }
};
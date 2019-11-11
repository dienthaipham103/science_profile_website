module.exports = (req, res, next)=>{
    const pID = parseInt(req.params.pID);
    const userID = req.userData.userID;
    if(userID === pID || userID === 1){
        next();
    }
    else{
        return res.status(401).json({
            message: "You can not access due to your role"
        })
    }
};
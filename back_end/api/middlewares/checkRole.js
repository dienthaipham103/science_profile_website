module.exports = (req, res, next)=>{
    const id = parseInt(req.params.id);
    const userID = req.userData.userID;
    if(userID === id || userID === 1){
        next();
    }
    else{
        return res.status(401).json({
            message: "You can not access due to your role"
        })
    }
};
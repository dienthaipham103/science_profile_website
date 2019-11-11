module.exports = (req, res, next)=>{
    const target_pID = parseInt(req.params.pID);
    const pID = req.userData.pID;
    if(pID === target_pID || pID === 1){
        next();
    }
    else{
        return res.status(401).json({
            message: "You can not access due to your role"
        })
    }
};
const mysqlConnection = require('../../connection');

module.exports = (req, res, next) =>{
    const email_st = req.userData.email_st;
    const last_key_used = req.userData.last_key_used;
    console.log(req.userData);
    mysqlConnection.query('select * from tbl_profile where email_st = ?',
        [email_st], (err, rows, fields)=>{
            if(!err){
                if(rows.length < 1){
                    return res.status(401).json({
                        message: "User deleted"
                    });
                };
                if(rows[0].last_key_used !== last_key_used){
                    console.log(rows[0].hash);
                    return res.status(401).json({
                        message: "Already logged out"
                    });
                };
                req.userData.hash = rows[0].hash;
                next();
            }
            else console.log(err);
        });
};
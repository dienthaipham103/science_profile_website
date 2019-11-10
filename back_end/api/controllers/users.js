const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const mysqlConnection = require('../../connection');
const config = require('../../config');

module.exports.signUp = (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const last_key_used = crypto.randomBytes(20).toString('hex');
    bcrypt.hash(password, config.SALT_ROUNDS, (err, hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            });
        }
        else{
            mysqlConnection.query('insert into users(`email`, `hash`, `last_key_used`) values(?, ?, ?)', 
            [email, hash, last_key_used], (err, rows, fields)=>{
                if(!err){
                    res.json({
                        rows_param: rows
                    });
                    console.log('Signup successfully!');
                }
                else{
                    res.status(500).json({
                        error: err
                    });
                    console.log(err);
                }
            });
        }
    });
};

module.exports.deleteUser = (req, res)=>{
    const userID = req.params.userID;//type: string
    mysqlConnection.query('delete from users where userID = ?',[userID], (err, rows, fields)=>{
        if(!err){
            res.json({
                rows_param: rows
            });
            console.log('Deleted successful!');
        }
        else{
            console.log(err);
        }
    });
};

module.exports.logIn = (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    mysqlConnection.query('select * from users where email = ?',[email], (err, rows, fields)=>{
        if(!err){
            if(rows.length < 1){
                return res.status(401).json({
                    message: 'Auth fail1'
                })
            }
            bcrypt.compare(password, rows[0].hash, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth fail2'
                    })
                }
                if(result){
                    const token = jwt.sign({userID: rows[0].userID, email: rows[0].email, last_key_used: rows[0].last_key_used},
                    config.JWT_KEY,
                    {expiresIn: "4h"});

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                };
                res.status(401).json({
                    message: 'Auth fail3'
                });
            });
        }
        else{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    });
};

module.exports.logOut = (req, res)=>{
    const userID = req.userData.userID;
    const new_last_key_used = crypto.randomBytes(20).toString('hex');
    mysqlConnection.query('update `users` set `last_key_used` = ? where `userID` = ?',
    [new_last_key_used, userID], (err, rows, fields)=>{
        if(!err){
            res.json({
                rows_param: rows
            });
            console.log('Log out successful!');
        }
        else{
            console.log(err);
        }
    });
};

module.exports.changePassWord = (req, res)=>{
    const userID = req.userData.userID;
    console.log(userID);
    console.log("hh" + req.userData.hash);
    const new_last_key_used = crypto.randomBytes(20).toString('hex');
    bcrypt.compare(req.body.old_passWord, req.userData.hash, (err, result)=>{
        if(err){
            return res.status(401).json({
                message: 'Can not check the old password'
            });
        };
        if(result){
            bcrypt.hash(req.body.new_passWord, config.SALT_ROUNDS, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                else{
                    mysqlConnection.query('update `users` set `last_key_used` = ?, `hash` = ? where `userID` = ?',
                                        [new_last_key_used, hash, userID], (err, rows, fields)=>{
                        if(!err){
                            console.log('Change password successful!');
                            return res.json({
                                rows_param: rows
                            });
                            
                        }
                        else{
                            console.log(err);
                        }
                    });
                };
            });
        }
        else{
            return res.status(401).json({
                message: 'The old password you enter is wrong'
            });
        }
    });
};
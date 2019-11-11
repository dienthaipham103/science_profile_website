const mysqlConnection = require('../../connection');

const GetOneProfile = require('../models/profiles');

module.exports.getOneProfile = (req, res)=>{
    const pID = req.params.pID;//type: string
    // string of query
    let query_str = `select * from tbl_profile where pID = ${pID};`;
    query_str += `select lang_name, listening, speaking, reading, writing from tbl_language where pID = ${pID};`;
    query_str += `select start_year, start_month, end_year, end_month, degree, major, university from tbl_education where pID = ${pID};`;
    query_str += `select start_year, start_month, end_year, end_month, wplace_name, address, position, department from tbl_work where pID = ${pID};`;
    query_str += `select name from tbl_research where pID = ${pID};`;
    query_str += `select role, title, journal, year, authors, type, issn_isbn, note, url_proof from view_profile_publication where pID = ${pID};`;
    query_str += `select start_year, start_month, end_year, end_month, proj_name, sponsor, refID from view_profile_project where pID = ${pID}`;
    mysqlConnection.query(query_str, (err, rows, fields)=>{
        if(!err){
            const prof = rows[0][0];
            const lang = rows[1];
            const edu = rows[2];
            const work = rows[3];
            const research = obj_str(rows[4]);
            const publication = rows[5];
            const project = rows[6];
            const getOneProfile = new GetOneProfile(prof.pID, prof.name, prof.birthday, prof.gender, prof.title, prof.cardID, prof.email_st, prof.email_nd, prof.mobile, prof.phone, prof.fax,
                lang, edu, work, research, publication, project);
            res.json(getOneProfile);
        }
        else{
            console.log(err);
        }
    });
};

// support for getOneProfile
function obj_str (arr){
    const new_arr = [];
    for(i = 0; i < arr.length; i++){
        new_arr[i] = arr[i].name;
    }
    return new_arr;
}

module.exports.updatePersonalInfo = (req, res)=>{
    const pID = req.params.pID;
    const updateFields = req.body;
    
    // create a query statement
    let str = 'update tbl_profile set ';
    for(let key in updateFields){
        if(updateFields.hasOwnProperty(key)){
            str += key + ' = ' + '"' + updateFields[key] + '"' + ', ';
        }
    };
    let query_str = str.slice(0, -2) + ' where pID = ' + '"' + pID + '"';

    // query to mySQL
    mysqlConnection.query(query_str, (err, rows)=>{
        if(!err){
            console.log("Update successfully!");
            res.json({
                message: "Update successfully"
            })
        }
        else{
            console.log(err);
        }
    })
}
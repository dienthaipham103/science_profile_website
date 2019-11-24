const mysqlConnection = require('../../connection');

const GetOneProfile = require('../models/profiles');

const queryServices = require('../../query_services');

module.exports.getOneProfile = (req, res) =>{
    const pID = req.params.pID;//type: string
    let userObject = new GetOneProfile();
    let arr = ['personal_info'];

    const query_stas = `select education, language, project, publication, research, work from tbl_stas where pID = ?`;
    
    mysqlConnection.query(query_stas, [pID], (err, rows)=>{
        if(err){
            res.json({'message': 'error'});
        }
        else{
            
            let query_info = `select name, birthday, gender, title, cardID, email_st, email_nd, mobile, phone, fax 
            from tbl_profile where pID = ?;`;
            const tables = rows[0];

            for(let key in tables){
                if(tables[key] > 0){
                    query_info += support_query(key, pID);
                    arr.push(key);
                }
            }

            mysqlConnection.query(query_info, Array(arr.length + 1).fill(pID), (err, rows)=>{
                if(err){
                    res.json({'message': 'error'});
                }
                else{
                    if(rows.length == 1){userObject.getValue(arr[0], rows[0]);}
                    else{userObject.getValue(arr[0], rows[0][0]);};

                    for(let i = 1; i < arr.length; i++){
                        userObject.getValue(arr[i], rows[i]);
                    }
                    res.json(userObject);
                }
            })
        }
    })
};

// support for getOneProfile
function support_query (key, pID){
    switch(key){
        case 'education':
            return `select start_year, start_month, end_year, end_month, degree, major, university 
            from tbl_education where pID = ?;`;
            break;
        case 'language':
            return `select lang_name, listening, speaking, reading, writing 
            from tbl_language where pID = ?;`;
            break;
        case 'publication':
            return `select role, title, journal, year, authors, type, issn_isbn, note, url_proof 
            from view_publication where pID = ?;`;
            break;
        case 'project':
            return `select role, start_year, start_month, end_year, end_month, proj_name, sponsor, refID 
            from view_project where pID = ?;`;
            break;
        case 'research':
            return `select name 
            from tbl_research where pID = ?;`;
            break;
        case 'work':
            return `select start_year, start_month, end_year, end_month, wplace_name, address, position, department 
            from tbl_work where pID = ?;`;
    }
    return;
}

module.exports.updatePersonalInfo = (req, res)=>{
    const pID = req.params.pID;
    const updateFields = req.body;
    
    // create a query statement
    const query = `update tbl_profile set ` + queryServices.support_update(updateFields, pID)[0] + ` where pID = ?`;

    // query to mySQL
    mysqlConnection.query(query, queryServices.support_update(updateFields, pID)[1], (err, rows)=>{
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
};
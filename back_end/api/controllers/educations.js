const mysqlConnection = require('../../connection');

const queryServices = require('../../query_services');

module.exports.insertOneEducation = (req, res)=>{
    const pID = req.params.pID;
    const insertFields = req.body;

    const query = `insert into tbl_education` + queryServices.support_insert(insertFields, pID)[0];
        // query to mySQL
    mysqlConnection.query(query, queryServices.support_update(insertFields, pID)[1], (err, rows)=>{
        if(!err){
            console.log("Insert successfully!");
            res.json({
                message: "Insert successfully"
            })
        }
        else{
            console.log(err);
        }
    })
};

module.exports.deleteOneEducation = (req, res)=>{
    const pID = req.params.pID;
    const primaryKeys = req.body;

    const query = `delete from tbl_education where pID = ? and start_year = ? and start_month = ? and degree = ?`;
    mysqlConnection.query(query, [pID, primaryKeys.start_year, primaryKeys.start_month, primaryKeys.degree], (err, rows)=>{
        if(!err){
            console.log('Delete successfully');
            res.json({'message': 'Delete successfully'});
        }
        else{
            console.log(err);
        }
    });
};

module.exports.updateOneEducation = (req, res)=>{
    const pID = req.params.pID;
    const primaryKeys = req.body.primary_keys;
    const updateFields = req.body.update_fields;

    // create a query statement
    const query = `update tbl_education set ` + queryServices.support_update(updateFields, pID)[0] + 
    ` where pID = ? and start_year = ? and start_month = ? and degree = ?`;

    const param = queryServices.support_update(updateFields, pID)[1].
    concat([primaryKeys.start_year, primaryKeys.start_month, primaryKeys.degree]);


        // query to mySQL
    mysqlConnection.query(query, param, (err, rows)=>{
        if(!err){
            console.log("Updated successfully!");
            res.json({
                message: "Updated successfully"
            })
        }
        else{
            console.log(err);
        }
    })
};


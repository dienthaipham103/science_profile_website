const mysqlConnection = require('../../connection');

const queryServices = require('../../query_services');

module.exports.insertOneLanguage = (req, res)=>{
    const pID = req.params.pID;
    const insertFields = req.body;

    const query = `insert into tbl_language` + queryServices.support_insert(insertFields, pID)[0];
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

module.exports.deleteOneLanguage = (req, res)=>{
    const pID = req.params.pID;
    const primaryKeys = req.body;

    const query = `delete from tbl_language where pID = ? and lang_name = ?`;
    mysqlConnection.query(query, [pID, primaryKeys.lang_name], (err, rows)=>{
        if(!err){
            console.log('Delete successfully');
            res.json({'message': 'Delete successfully'});
        }
        else{
            console.log(err);
        }
    });
};

module.exports.updateOneLanguage = (req, res)=>{
    const pID = req.params.pID;
    const primaryKeys = req.body.primary_keys;
    const updateFields = req.body.update_fields;

    // create a query statement
    const query = `update tbl_language set ` + queryServices.support_update(updateFields, pID)[0] + 
    ` where pID = ? and lang_name = ?`;

    const param = queryServices.support_update(updateFields, pID)[1].
    concat([primaryKeys.lang_name]);


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


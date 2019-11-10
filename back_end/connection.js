const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dienthaipham103',
    database: 'science_info',
    multipleStatements: true
});

// connect to database
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Connected to database!');
    }
    else{
        console.log(err);
    }
});

// const str = "select * from `tbl_profile` where pID = ?; select * from `tbl_education` where pID = ?";

// mysqlConnection.query(str, [1, 1], function(err, results) {
//     if (err) throw err;
  
//     // `results` is an array with one element for every statement in the query:
//     console.log(results[0]); // [{1: 1}]
//     console.log(results[1]); // [{2: 2}]
//     console.log(typeof results);
//     console.log(typeof results[0]);
//     console.log(results);
//     console.log(typeof [1, 2, 3]);
//   });

module.exports = mysqlConnection;
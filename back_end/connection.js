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

module.exports = mysqlConnection;
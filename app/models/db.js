const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");



var mysqlConnection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    insecureAuth : true
    });


mysqlConnection.connect((err)=> {
    if(!err) console.log('Connection Established Successfully');
    else console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });    

module.exports = mysqlConnection    

const mysql = require("mysql2");
const connection = mysql.createConnection({

    host: "localhost",
  
    // Your username
    //hair
  
    user: "root",
  
    // Your password
  
    password: "password",
  
    database: "employees_db"
  
  });
  
  
  
  connection.connect(function (err) {
  
    if (err) throw err;
  
  });
  
  
  
  module.exports = connection;
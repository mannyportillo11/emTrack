
//import mysql2 package ------ migrated from server.js for modularization
const mysql = require("mysql2");

//connect to database ------ migrated from server.js
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your SQL password
    password: "Aukn2isv!",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

//export
module.exports = db;
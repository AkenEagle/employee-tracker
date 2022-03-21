const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Password123!!",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

// Create the DB
db.query("DROP DATABASE IF EXISTS company_db");
db.query("CREATE DATABASE company_db");

// Create the tables
db.query("CREATE TABLE department (id INT PRIMARY KEY, name VARCHAR(30))");

db.query(
  "CREATE TABLE role (id INT PRIMARY KEY,title VARCHAR(30),salary DECIMAL,department_id INT)"
);

db.query(
  "CREATE TABLE employee (id INT PRIMARY KEY,first_name VARCHAR(30),last_name VARCHAR(30),role_id INT,manager_id INT)"
);

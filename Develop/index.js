// const ctable = require("console.table");
const express = require("express");
const mysql = require("mysql2");

const inquirer = require("inquirer");
// Import and require mysql2
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);


// Create an employee

app.post("/api/new-employee", ({ body }, res) => {
  const sql = `INSERT INTO employees (employee_name)
    VALUES (?)`;
  const employee_name = body.employee_name;

  db.query(sql, employee_name, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

// Check all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT id, employee_name AS title FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: [],
    });
    // console.log(ctable.getTable(rows))
  });
});

// Delete an employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});


app.get("/api/employee-roles", (req, res) => {
  const sql = `SELECT employees.employee_name AS employee, roles.role FROM roles JOIN employees ON roles.employee_id = employee.id ORDER BY employee.employee_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// BONUS: Update review name
app.put("/api/role/:id", (req, res) => {
  const sql = `UPDATE roles SET role = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Role not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

 inquirer
    .prompt([

      {
        name: "employeeList",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "View All Employees",
          "Quit"],
      },
    ])
    .then(answer=>{
      let choice = answer.employeeList
      console.log(choice)
      switch (choice){
        case "Add Employee": 
        console.log("My add employee function goes here");
        addEmployee()
        break;
        default: 
        console.log("Invalid option")
        break;
      }
    }); 
    
  function addEmployee() {
  //"code to add employees to database"
  //add inquirer prompts and enter into the database
  }



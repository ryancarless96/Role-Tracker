require("console.table");

const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;

const db = require("./config/connection");

// Check all employees

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
        "Add Roles",
        "View All Departments",
        "Add Department",
        "View All Employees",
        "Quit"],
    },
  ])
  .then(answer => {
    let choice = answer.employeeList
    console.log(choice)
    switch (choice) {
      case "Add Employee":
        console.log("My add employee function goes here");
        addEmployee()
        break;
      case "Update Employee Role":
        updateEmployeeRoles()
        break;
      case "View All Employees":
        viewAllEmployees()
        break;
      case "View All Roles":
        viewAllRoles()
        break;
      case "Add Role":
        addRoles()
        break;
      case "View All Departments":
        viewAllDepartments()
        break;
      case "Add Department":
        addDepartment()
        break;
      default:
        console.log("Invalid option")
        break;
    }
  });

function addEmployee() {
  db.query("select * from role;", function (err,res) {
    if(err) throw err; 
    const role = res;
    db.query("select * from employee;", function(err,res){
      if(err) throw err;
      const managers = res;
    })
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Place your first name here:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Place your last name here:"
      },
      {
        type: "list",
        name: "role",
        message: "Place your role id number here:",
        choices: role.map((role)=>({
          name: role.title, 
          value: role.id,
        }))
      },
      {
        type: "list",
        name: "manager",
        message: "Place your manager here:",
        choices: managers.map((managers)=>({
        name:managers.first_name + managers.last_name,
        value: managers.id
      })),

      },
    ])
    .then(data => {
      db.query("insert into employee set ?", 
      {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.role,
        manager_id: data.manager
      },function(err,res) {
        if(err) throw (err);
      });
    })
    .then(()=> {})
  });
  //"code to add employees to database"
  //add inquirer prompts and enter into the database
}
function viewAllRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "jobTitle",
        message: "Place your job title here:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Place your role id here:"
      },
      {
        type: "input",
        name: "department",
        message: "Place your department here:"
      },
      {
        type: "input",
        name: "salary",
        message: "Place your salary here:"
      },
    ])
    .then(data => {
      db.query("SELECT * FROM role LEFT JOIN role ON employee.role_id", (err, res) => {
        if (err) throw err
        console.log(res)
      })
    })
}
function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "jobTitle",
        message: "Place your job title here:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Place your role id here:"
      },
      {
        type: "input",
        name: "department",
        message: "Place your department here:"
      },
      {
        type: "input",
        name: "salary",
        message: "Place your salary here:"
      },
    ])
    .then(data => {
      const instance = addRoles(data.jobTitle, data.roleId, data.department, data.salary)
      teamArray.push(instance)
      console.log(teamArray)
      addRoles()
    })
}
function viewAllDepartments() {
  db.query("SELECT * FROM department LEFT JOIN role ON employee.role_id", (err, res) => {
    if (err) throw err
    console.table(res)
  })
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Place your department here:"
      },
    ])
    .then(data => {
      const instance = addDepartment(data.department)
      teamArray.push(instance)
      console.log(teamArray)
      addDepartment()
    })
}
function viewAllEmployees() {
  db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id", (err, res) => {
    if (err) throw err
    console.table(res)
  })

}

function updateEmployeeRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee",
        message: "Write down your employee here:",
      },
      {
        type: "input",
        name: "role",
        message: "Write down the employee's role here:"
      }
    ])
    .then(data => {
      const instance = updateEmployeeRoles(data.employee, data.role)
      teamArray.push(instance)
      console.log(teamArray)
      updateEmployeeRoles()
    })
}





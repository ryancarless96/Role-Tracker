require("console.table");

const inquirer = require("inquirer");
const db = require("./config/connection")

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
      default:
        console.log("Invalid option")
        break;
    }
  });

function addEmployee() {
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
        type: "input",
        name: "role",
        message: "Place your role here:"
      },
      {
        type: "input",
        name: "manager",
        message: "Place your manager here:"
      },
    ])
    .then(data => {
      const instance = new Employee(data.firstName, data.lastName, data.role, data.manager)
      teamArray.push(instance)
      console.log(teamArray)
      addNewEmployee()
    })
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
      const instance = viewAllRoles(data.jobTitle, data.roleId, data.department, data.salary)
      teamArray.push(instance)
      console.log(teamArray)
      viewAllRoles()
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
      const instance = viewAllDepartments(data.jobTitle, data.roleId, data.department, data.salary)
      teamArray.push(instance)
      console.log(teamArray)
      viewAllDepartments()
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





require("console.table");


const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;


const db = require("../config/connection");


// Check all employees

function startMenu(){
  console.log ("Hello")
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

}
function addEmployee() {
  let managers; 
  db.query("select * from role;", function (err,res) {
    if(err) throw err;
    const role = res;
 
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Place your role id number here:",
        choices: role.map((role)=>({
          name: role.title,
          value: role.id,
        }))
      },
      
    ])
    .then(data => {
      db.query("select * from employee;", function(err,res){
      if(err) throw err;
     managers = res;
     inquirer 
     .prompt([
      {
        type: "list",
        name: "manager",
        message: "Place your manager here:",
        choices: managers.map((managers)=>({
        name:managers.first_name + managers.last_name,
        value: managers.id
      })),
      },
     ]) .then(()=> {
      //   db.query("insert into employee set ?",
    //   {
    //     role_id: data.role,
    //     manager_id: data.manager
    //   },function(err,res) {
    //     if(err) throw (err);
    //   });
    })
    }) 
    })
    
  });
  //"code to add employees to database"
  //add inquirer prompts and enter into the database
}
function viewAllRoles() {
    db.query("SELECT * FROM role LEFT JOIN department ON role.department_id = department.id", (err, res) => {
        if (err) throw err
        console.table(res)
        startMenu()
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
  // db.query("SELECT * FROM department LEFT JOIN role ON employee.role_id", (err, res) => {
  //   if (err) throw err
  //   console.table(res)
  // })
  db.query('SELECT * FROM department', (err, res) => {
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
  db.findEmployeeRoles()
  .then(([rows])=> {
    let employees = rows;
    const employeeChoices = employees.map(({id, first_name, last_name})=> ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  })
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }

    ])
    .then(res => {
      let employeeId = res.employeeId
      db.findEmployeeRoles(employeeId)
      .then(([rows])=> {
        let managers = rows;
        const managerChoices = managers.map(({id, first_name, last_name})=> ({
          name: `${first_name} ${last_name}`,
          value: id
        }));

        inquirer 
        prompt([
          {
            type: "list",
            name: "managerId",
            message: "Which employee do want to set as manager for the selected employee?",
            choices: managerChoices
          }
        ])
        .then(res => db.findEmployeeRoles(employeeId, res.managerId))
        .then(()=> console.log("Updated employee manager"))
        .then(()=> loadMainPrompts())
      })
      function findEmployeeRoles() {
        return something.something.promise().query(
          "SELECT some stuff from some stuff and JOIN some stuff"
        );
      }
      
      
    })
    
}

startMenu()






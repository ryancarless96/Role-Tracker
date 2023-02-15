const inquirer = require("inquirer");

function start() {
    console.log("Starting function")
    inquirer.prompt([
        {
            type: "input",
            message: "What ups",
            name: "Action"
        }
    ]).then(answer => {
        console.log("hello, we done")
    })
}

start()
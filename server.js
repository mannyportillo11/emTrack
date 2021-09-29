const db = require("./lib/connection");
const inquirer = require("inquirer");
const { response } = require("express");

function toDo() {
    inquirer
      .prompt({
        type: "list",
        name: "toDo",
        message: "What would like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Role",
          "Remove Employee",
          "Update Employee Role",
        ],
      })
      .then(function (userInput) {
        switch (userInput.toDo) {
          case "View All Employees":
            viewEmployees();
            break;
          case "View All Employees By Department":
            viewEmployeesbyDepart();
            break;
          case "View All Departments":
            viewDepartments();
            break;
          case "View All Roles":
            viewRoles();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Add Role":
            addRole();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Remove Employee":
            removeEmployee();
            break;
        }
      });
  }
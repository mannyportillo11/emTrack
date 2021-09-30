const { response } = require("express");

const inquirer = require("inquirer");
const db = require('./db/connection');


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
  });
  //function to show questions
  function questions() {
    inquirer
      .prompt({
        type: "list",
        name: "questions",
        message: "What would like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Employee By Department",
          // "Update Employee Role",
          "Exit Here",
        ],
      })
      .then(function (answers) {
        if (answers.questions === "View All Employees") {
          getEmps();
        } else if (answers.questions === "View All Departments") {
          getDept();
        } else if (answers.questions === "View All Roles") {
          getRoles();
        } else if (answers.questions === "View Employee By Department") {
          empByDept()
        }else if (answers.questions === "Add Employee") {
          addEmp();
        } else if (answers.questions === "Add Department") {
          addDept();
      //   } else if (answers.questions === "Update Employee Role") {
      //     empRole();
        } else if (answers.questions === "Add Role") {
          addRole();
        } else if (answers.questions === "Exit Here") {
          // exit
          return;
        }
      });
  }
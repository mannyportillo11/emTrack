const { response } = require("express");

const inquirer = require("inquirer");
const db = require('./db/connection');
const cTable = require('console.table');


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
  });

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
        } else if (answers.questions === "Add Role") {
          addRole();
        } else if (answers.questions === "Exit Here") {
          return;
        }
      });
  }

//ALL FUNCTIONS

function getRoles() {
    const sql = `SELECT * FROM name_role;`;
    db.query(sql, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    });
  }

function getEmps() {
    const sql = ` SELECT * FROM employee;`;
    db.query(sql, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    });
  }

function getDept() {
    const sql = `SELECT * FROM departments;`;
    db.query(sql, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    });
  }
  
function addDept() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the department?",
        },
      ])
      .then(function (inform) {
        const depart = inform.deptName;
  
        const sql = `INSERT INTO departments (department_name)
          VALUES ('${depart}')`;
        db.query(sql, function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        });
      });
    };

function addRole() {
        inquirer
          .prompt([
            {
              type: "input",
              name: "titleInfo",
              message: "What title does the role have?",
            },
            {
              type: "input",
              name: "income",
              message: "How much is the salary?",
            },
            {
              type: "input",
              name: "dpt",
              message: "What is the departments id?",
            },
          ])
          .then(function (info) {
            const roleTi = info.titleInfo;
            const roleIn = info.income;
            const roleDt = info.dpt;
      
            const sql = `INSERT INTO name_role (title, salary, department_id)
                VALUES ('${roleTi}', '${roleIn}', '${roleDt}')`;
            db.query(sql, function (err, res) {
              if (err) throw err;
              console.table(res);
              questions();
            });
          });
};
      
function addEmp() {
        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
            },
            {
              type: "input",
              name: "empRole",
              message: "What is the employee's role?",
            },
            {
              type: "input",
              name: "mgr",
              message: "Enter the managers id? ",
            },
          ])
          .then(function (info) {
            const infoFirst = info.firstName;
            const infoLast = info.lastName;
            const infoRole = info.empRole;
            const infoMgr = info.mgr;
      
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES ('${infoFirst}', '${infoLast}', '${infoRole}', '${infoMgr}')`;
            db.query(sql, function (err, res) {
              if (err) throw err;
              console.table(res);
              questions();
            });
          });
      };

function empByDept() {
    const sql = `SELECT departments.deptartment_name, employee.first_name, employee.last_name
    FROM employee LEFT JOIN name_role on employee.role_id = name_role.id
    LEFT JOIN departments ON name_role.department_id = department.id;`;
    db.query(sql, function (err, res) {
      if (err) throw err;
      console.table(res);
      questions();
    }); 
  }

  questions();
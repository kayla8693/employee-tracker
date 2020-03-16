const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');


const TEXT_ADD_DEPARTMENT = "Add a department";
const TEXT_ADD_ROLE = "Add a role";
const TEXT_ADD_EMPLOYEE = "Add an employee";
const TEXT_VIEW_DEPARTMENTS = "View departments";
const TEXT_VIEW_ROLES = "View roles";
const TEXT_VIEW_EMPLOYEES = "View all employees";
const TEXT_UPDATE_EMPLOYEE_ROLE = "Update employee role";

// BONUS
const TEXT_UPDATE_EMPLOYEE_MANAGER = "Update employee manager";
const TEXT_VIEW_EMPLOYEE_BY_MANAGER = "View employee by manager";
const TEXT_DELETE_DEPARTMENT = "Delete department";
const TEXT_DELETE_ROLE = "Delete role";
const TEXT_DELETE_EMPLOYEE = "Delete employee";
const TEXT_VIEW_DEPARTMENT_BUDGET = "View department budget";
const EXIT = "Exit";


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Inuyasha1",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('You are connected at id: ' + connection.threadId);
    queryUser();
});

console.table([
    {
        id: "val",
        first_name: 3,
        last_name: "",
        title: "",
        department: "",
        salary: "",
        manager: ""
    }
]);


function queryUser() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            TEXT_ADD_DEPARTMENT,
            TEXT_ADD_ROLE,
            TEXT_ADD_EMPLOYEE,
            TEXT_VIEW_DEPARTMENTS,
            TEXT_VIEW_ROLES,
            TEXT_VIEW_EMPLOYEES,
            TEXT_UPDATE_EMPLOYEE_ROLE,
            EXIT
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case TEXT_ADD_DEPARTMENT:
                addDepartment();
                break;
            case TEXT_ADD_ROLE:
                addRole();
                break;
            case TEXT_ADD_EMPLOYEE:
                addEmployee();
                break;
            case TEXT_VIEW_DEPARTMENTS:
                viewDepartments();
                break;
            case TEXT_VIEW_ROLES:
                viewRoles();
                break;
            case TEXT_VIEW_EMPLOYEES:
                viewAllEmployees();
                break;
            case TEXT_UPDATE_EMPLOYEE_ROLE:
                updateEmployeeRole();
                break;
            case EXIT:
                console.log("Goodbye");
                connection.end();
                break;
        };
    });
};


function addDepartment() {
    inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Please give the department a unique number id."
        },
        {
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        }

    ]).then(function (answer) {
        const { id, department } = answer;
        const query = ("INSERT INTO DEPARTMENT VALUES(?, ?)");
        connection.query(query, [id, department], function (err, res) {
            if (err) throw err;
        });
        connection.query("SELECT * FROM DEPARTMENT", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        queryUser();
    });
};
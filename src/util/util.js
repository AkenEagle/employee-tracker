const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("../db/db");

// Declared first question on start
const askFirstQuestion = async () => {
  const questions = [
    {
      name: "options",
      message: "What do you want to do?",
      type: "list",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ];

  const answer = await inquirer.prompt(questions);
  return answer;
};

const displayDepartments = () => {
  // execute mysql query
  db.query("SELECT * FROM department", (err, results) => {
    // log/table departments
    console.table(results);
  });
};

const displayRoles = () => {
  // execute mysql query
  db.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY department.name",
    (err, results) => {
      // log/table roles
      console.table(results);
    }
  );
};

const displayEmployees = () => {
  // execute mysql query
  db.query(
    "SELECT employee_role.first_name, employee_role.last_name, title , salary,  name AS department,  CONCAT (employee_manager.first_name, ' ', employee_manager.last_name) AS manager FROM employee employee_role LEFT JOIN role ON employee_role.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id",
    (err, results) => {
      // log/table employees
      console.table(results);
    }
  );
};

const addDepartment = () => {
  const getDepartments = () => {
    // execute mysql query
    // return departments
  };

  // prompt department questions (name) and get answers
  // construct mysql insert query
  // execute mysql query
};

const addRole = () => {
  const getRoles = () => {
    // execute mysql query
    // return roles
  };
  // get departments from DB
  // pass the departments to a choice constructor function
  // prompt question to select department, title, salary and get answers
  // construct mysql insert query for role
  // execute mysql query
};

const addEmployee = () => {
  const getEmployees = () => {
    // execute mysql query
    // return employees
  };
  // get roles from DB
  // get employees from DB
  // pass the roles to a choice constructor function
  // pass the employees to a choice constructor function
  // prompt question to select role, select manager, first name, last name and get answers
  // construct mysql insert query for employee
  // execute mysql query
};

const constructDepartmentChoices = (departments) => {
  // return an array of department choices
};

const constructRoleChoices = (roles) => {
  // return an array of role choices
};

const constructEmployeeChoices = (roles) => {
  // return an array of employee choices
};

module.exports = {
  askFirstQuestion,
  displayDepartments,
  displayRoles,
  displayEmployees,
  addRole,
  addEmployee,
  constructDepartmentChoices,
  constructRoleChoices,
  constructEmployeeChoices,
  addDepartment,
};

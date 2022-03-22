const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("../db/db");

// Used to wait 2 secs before returning to menu
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

// Get results from DB
const getResults = async (query) => {
  const results = await new Promise((resolve, reject) =>
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  );

  return results;
};

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
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit",
      ],
    },
  ];

  const answer = await inquirer.prompt(questions);
  return answer.options;
};

const displayDepartments = async () => {
  const query = "SELECT * FROM department";
  const results = await getResults(query);
  console.table(results);
  await sleep();
};

const displayRoles = async () => {
  const query =
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id ORDER BY department.name";
  const results = await getResults(query);
  console.table(results);
  await sleep();
};

const displayEmployees = async () => {
  const query =
    "SELECT employee_role.first_name, employee_role.last_name, title , salary,  name AS department,  CONCAT (employee_manager.first_name, ' ', employee_manager.last_name) AS manager FROM employee employee_role LEFT JOIN role ON employee_role.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id";

  const results = await getResults(query);
  console.table(results);
  await sleep();
};

const addDepartment = async () => {
  const question = [
    {
      type: "input",
      name: "department",
      message: "Enter department name:",
    },
  ];
  const answer = await inquirer.prompt(question);
  // execute mysql query
  db.query(`INSERT INTO department (name) VALUES ('${answer.department}')`);
  console.log(`Department ${answer.department} succesfully added.`);
  await sleep(2000);
};

const addRole = async () => {
  // Role question
  const roleQuestion = [
    {
      type: "input",
      name: "role",
      message: "Enter role title:",
    },
  ];
  const roleTitle = await inquirer.prompt(roleQuestion);

  // Salary question
  const salaryQuestion = [
    {
      type: "input",
      name: "salary",
      message: "Enter salary amount:",
    },
  ];
  const salaryAmount = await inquirer.prompt(salaryQuestion);

  // Ask for which department to add this role
  const departmentQuery = "SELECT name FROM department";
  const departments = await getResults(departmentQuery);
  const departmentQuestion = [
    {
      name: "choice",
      message: "Choose department for this role:",
      type: "list",
      choices: departments,
    },
  ];
  const department = await inquirer.prompt(departmentQuestion);
  const departmentIdQuery = `SELECT id FROM department WHERE name = "${department.choice}"`;
  const departmentId = await getResults(departmentIdQuery);

  // Add role in DB
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES ("${roleTitle.role}", ${salaryAmount.salary}, ${departmentId[0].id})`
  );
  console.log(
    `Role ${roleTitle.role} with salary ${salaryAmount.salary} added to department ${department.choice}`
  );
  await sleep();
};

const addEmployee = () => {
  // get roles from DB
  // get employees from DB
  // pass the roles to a choice constructor function
  // pass the employees to a choice constructor function
  // prompt question to select role, select manager, first name, last name and get answers
  // construct mysql insert query for employee
  // execute mysql query
};

module.exports = {
  askFirstQuestion,
  displayDepartments,
  displayRoles,
  displayEmployees,
  addRole,
  addEmployee,
  addDepartment,
};

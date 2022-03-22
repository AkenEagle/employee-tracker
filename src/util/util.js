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
  const departmentQuery = "SELECT * FROM department";
  const departmentsResults = await getResults(departmentQuery);

  const departments = departmentsResults.map((department) => {
    return {
      name: department.name,
      value: department.id,
    };
  });

  const departmentQuestion = [
    {
      name: "choice",
      message: "Choose department for this role:",
      type: "list",
      choices: departments,
    },
  ];

  const department = await inquirer.prompt(departmentQuestion);

  // Add role in DB
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES ("${roleTitle.role}", ${salaryAmount.salary}, ${department.choice})`
  );
  console.log(
    `Role ${roleTitle.role} with salary ${salaryAmount.salary} added`
  );
  await sleep();
};

const addEmployee = async () => {
  // get roles from DB
  const rolesQuery = "SELECT * FROM role";
  const rolesResults = await getResults(rolesQuery);

  // get employees from DB
  const employeesQuery = "SELECT * FROM employee";
  const employees = await getResults(employeesQuery);

  // pass the roles to a choice constructor function
  const roles = rolesResults.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });

  const rolesQuestion = [
    {
      name: "choice",
      message: "Choose a role for this employee:",
      type: "list",
      choices: roles,
    },
  ];

  // pass the employees to a choice constructor function
  const managers = employees.map((employee) => {
    return {
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    };
  });

  const managerQuestion = [
    {
      name: "choice",
      message: "Choose a manager for this employee:",
      type: "list",
      choices: [{ name: "None", value: null }, ...managers],
    },
  ];

  const firstNameQuestion = [
    {
      type: "input",
      name: "choice",
      message: "Enter employee's First Name:",
    },
  ];

  const lastNameQuestion = [
    {
      type: "input",
      name: "choice",
      message: "Enter employee's Last Name:",
    },
  ];
  // prompt question to select role, select manager, first name, last name and get answers
  const role = await inquirer.prompt(rolesQuestion);
  const manager = await inquirer.prompt(managerQuestion);
  const firstName = await inquirer.prompt(firstNameQuestion);
  const lastName = await inquirer.prompt(lastNameQuestion);

  console.log(`Employee ${firstName.choice} ${lastName.choice} added`);

  // construct mysql insert query for employee
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName.choice}", "${lastName.choice}", ${role.choice}, ${manager.choice})`
  );

  sleep();
};

const updateEmployeeRole = async () => {};

module.exports = {
  askFirstQuestion,
  displayDepartments,
  displayRoles,
  displayEmployees,
  addRole,
  addEmployee,
  addDepartment,
  updateEmployeeRole,
};

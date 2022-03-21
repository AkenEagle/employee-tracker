const {
  askFirstQuestion,
  displayDepartments,
  displayRoles,
  displayEmployees,
} = require("./util/util");

const start = async () => {
  // prompt question and get answer (action)
  let mainMenuAnswer = await askFirstQuestion();

  if (mainMenuAnswer == "View all departments") displayDepartments();
  if (mainMenuAnswer == "View all roles") displayRoles();
  if (mainMenuAnswer == "View all employees") displayEmployees();

  if (mainMenuAnswer == "addDepartment") {
    // prompt department questions (name) and get answers
    // construct mysql insert query
    // execute mysql query
  }
  if (mainMenuAnswer == "addRole") {
    // get departments from DB
    // pass the departments to a choice constructor function
    // prompt question to select department, title, salary and get answers
    // construct mysql insert query for role
    // execute mysql query
  }
  if (mainMenuAnswer == "addEmployee") {
    // get roles from DB
    // get employees from DB
    // pass the roles to a choice constructor function
    // pass the employees to a choice constructor function
    // prompt question to select role, select manager, first name, last name and get answers
    // construct mysql insert query for employee
    // execute mysql query
  }
};

start();

const {
  askFirstQuestion,
  displayDepartments,
  displayRoles,
  displayEmployees,
  addDepartment,
  addRole,
  addEmployee,
} = require("./util/util");

const start = async () => {
  // prompt question and get answer (action)
  let mainMenuAnswer = await askFirstQuestion();

  // handle function based on the answer
  if (mainMenuAnswer == "View all departments") displayDepartments();
  if (mainMenuAnswer == "View all roles") displayRoles();
  if (mainMenuAnswer == "View all employees") displayEmployees();
  if (mainMenuAnswer == "Add a department") addDepartment();
  if (mainMenuAnswer == "addRole") addRole();
  if (mainMenuAnswer == "addEmployee") addEmployee();
};

start();

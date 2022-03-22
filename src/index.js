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
  let appRunning = true;

  while (appRunning) {
    // prompt question and get answer (action)
    let mainMenuAnswer = await askFirstQuestion();

    // handle function based on the answer
    if (mainMenuAnswer == "View all departments") await displayDepartments();
    if (mainMenuAnswer == "View all roles") displayRoles();
    if (mainMenuAnswer == "View all employees") displayEmployees();
    if (mainMenuAnswer == "Add a department") addDepartment();
    if (mainMenuAnswer == "Add a Role") addRole();
    if (mainMenuAnswer == "Add an Employee") addEmployee();
    if (mainMenuAnswer == "Exit") {
      appRunning = false;
      console.log("\nAu revoir!");
      process.exit();
    }
  }
};

start();

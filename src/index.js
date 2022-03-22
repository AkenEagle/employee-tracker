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
    if (mainMenuAnswer == "View all roles") await displayRoles();
    if (mainMenuAnswer == "View all employees") await displayEmployees();
    if (mainMenuAnswer == "Add a department") await addDepartment();
    if (mainMenuAnswer == "Add a Role") await addRole();
    if (mainMenuAnswer == "Add an Employee") await addEmployee();
    if (mainMenuAnswer == "Exit") {
      appRunning = false;
      console.log("\nAu revoir!");
      process.exit();
    }
  }
};

start();

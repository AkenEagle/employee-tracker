USE company_db;

INSERT INTO department (name) VALUES ("Sales"), ("Engineering");

INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 30.000, 2), ("Sales Associate", 25.000, 1)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mark", "Zuck", 1, 1), ("Luke", "Jackson", 2, 2)
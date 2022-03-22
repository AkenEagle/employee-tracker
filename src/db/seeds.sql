USE company_db;

INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Accounting"), ("Human Resources");

INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Engineer", 40000, 2), ("Software Engineer", 30000, 2), ("Sales Associate", 25000, 1), ("Accountant", 20000, 3), ("HR Member", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mark", "Zuck", 1, null),  ("Tom", "Thompson", 4, null), ("Andrey", "Andrews", 5, null), ("Luke", "Jackson", 2, 1), ("Maria", "Apple", 3, 4);
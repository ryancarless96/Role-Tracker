use employees_db;

INSERT INTO department (id,name)
VALUES (1,"Finance"),
       (2,"Marketing"),
       (3,"Accounting"),
       (4,"Customer Service"),
       (5, "Human Resources");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "designer", 600, 2),
       (2, "stock broker", 500, 1),
       (3, "accountant", 500, 3),
       (4, "telemarketer", 400, 4),
       (5, "recruiter", 300,5);

INSERT INTO employee (id,first_name, last_name, role_id, manager_id)
VALUES (1, "Kyle", "Robertson", 2, NULL),
(2, "Melissa", "Johnson", 1, NULL),
(3, "Johnny", "Addison", 3, 1 ),
(4, "Chris", "Thorton", 5, 2),
(5,"Annie", "Pearson", 4, NULL);

       
       

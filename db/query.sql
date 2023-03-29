SELECT employees.employee_name AS employee, roles.role
FROM roles
JOIN employees
ON roles.employee_id = employees.id
ORDER BY employees.employee_name;


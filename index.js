const inquirer = require("inquirer")
const { printTable } = require('console-table-printer');
const { Pool } = require('pg');
require("dotenv").config()

const pool = new Pool(
  {
    
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: 'localhost',
    database: process.env.DBNAME
  },
)

pool.connect(() => {
  mainMenu()
});

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role


function mainMenu() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "menu",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    }
  ])
    .then(response => {
      if (response.menu === "view all departments") {
        viewDepartments()
      }
      else if (response.menu === "view all roles"){
        viewRoles()
      }
      else if (response.menu === "view all employees") {
        viewEmployees()
      }
      else if(response.menu ==="add a department"){
        addDepartment()
      }
      else if(response.menu === "add a role"){
        addRole()
      }
      else if (response.menu === "add an employee") {
        addEmployee()
      }
      else if (response.menu === "update an employee role") {
        updateEmployeeRole()
      }
    })
}

function updateEmployeeRole(){
  pool.query("SELECT CONCAT(first_name,' ',last_name ) as name, id as value from employee", (err,{rows})=>{
             
    pool.query("SELECT title as name, id as value from role", (err,{rows:roleRows}) =>{
      if(err) throw err;
        inquirer.prompt([
          {
            type:"list",
            message:"Which employee's do you want to update?",
            name:"employee",
            choices:rows
          },{
            type:"list",
            message:"Which role do you want to assign to the selected employee?",
            name:"role",
            choices:roleRows
          }
        ])
        .then(res=>{
            pool.query(`update employee set role_id = ${res.role} where id=${res.employee}`, (err)=>{
              if (err) throw err;
                   console.log("Employee's role has been updated!")
                   viewEmployees()
            })
        })      
    })
  })  
}

function addRole() {
  pool.query("SELECT id, name FROM department", (err, { rows: departments }) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: "input",
        message: "Enter the name of the role:",
        name: "roleName"
      },
      {
        type: "input",
        message: "Enter the salary for the role:",
        name: "salary"
      },
      {
        type: "list",
        message: "Select the department for the role:",
        name: "departmentId",
        choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
      }
    ])
    .then(res => {
      pool.query(
        `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`,
        [res.roleName, res.salary, res.departmentId],
        (err) => {
          if (err) throw err;
          console.log("New role added!");
          viewRoles();
        }
      );
    });
  });
}


function viewRoles() {
  pool.query(`SELECT role.id, role.title, department.name AS department, role.salary 
     FROM role 
     JOIN department ON role.department_id = department.id `, (err,{rows})=> {
    if (err)throw err;
    printTable(rows);
    mainMenu();
  });
}

function addEmployee() {
  pool.query("SELECT title as name, id as value from role", (err, { rows }) => {
      
    pool.query("SELECT CONCAT(first_name,' ',last_name ) as name, id as value from employee ", (err, { rows: managerRows }) => {

      inquirer.prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last_name"
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role",
          choices: rows

        },
        {
          type: "list",
          message: "What is the employee's manager?",
          name: "manager",
          choices: managerRows

        }
      ])
      .then(res=>{

        pool.query(`INSERT INTO employee (first_name, last_name, role_id,manager_id)
          VALUES('${res.first_name}','${res.last_name}', ${res.role},${res.manager})`,(err)=>{
            console.log("New employee has been added into system!")
            viewEmployees()
          })
      })
    })
  })
}

function viewEmployees() {
  pool.query(`SELECT employee.id, employee.first_name,employee.last_name,
role.title, department.name as department, role.salary, CONCAT(employee_manager.first_name,' ' ,   employee_manager.last_name) as manager
FROM employee
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON department.id = role.department_id
LEFT JOIN employee as employee_manager ON employee.manager_id=employee_manager.id order by employee.id`, (err, { rows }) => {
    printTable(rows)
    mainMenu()
  })
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new department:",
      name: "departmentName"
    }
  ])
  .then(res => {
    pool.query(`INSERT INTO department (name) VALUES ('${res.departmentName}')`, (err) => {
      if (err) throw err;
      console.log("New department added!");
      viewDepartment();
    });
  });
}


function viewDepartments() {
  pool.query("SELECT * FROM department", (err, {rows}) => {
    
    printTable(rows)
    mainMenu()
  })
}
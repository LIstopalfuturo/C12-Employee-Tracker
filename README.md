# C12-Employee-Tracker

## This Employee Management System is a command-line application that allows a business owner to view and manage the departments, roles, and employees in their company, helping them organize and plan their business efficiently.

## Table of Contents 

Description
Features
Technologies Used
Installation
Usage
Database Schema
Screenshots
Future Enhancements
License

## Description

This application is built to help business owners manage their organization structure. With a focus on managing employees, roles, and departments, this tool allows users to view, add, and update company records through a user-friendly command-line interface.

## Features

View all departments: Displays a list of departments along with their IDs.
View all roles: Shows job titles, role IDs, departments associated with each role, and the salary for each role.
View all employees: Lists all employees along with their IDs, first names, last names, job titles, departments, salaries, and managers.
Add a department: Allows the user to add a new department to the database.
Add a role: Enables the user to add a new role by specifying the name, salary, and department.
Add an employee: Prompts the user to enter the employee's first name, last name, role, and manager to add them to the database.
Update an employee's role: Allows the user to select an employee and assign them a new role.

## Technologies Used

Node.js: JavaScript runtime environment for executing server-side code.
PostgreSQL: Relational database management system for data storage.
Inquirer.js: Library for building interactive command-line prompts.
Console Table Printer: Used for formatting and printing tables in the console.

## Installation

Clone the Repository:

bash

git clone https://github.com/yourusername/employee-management-system.git
cd employee-management-system

Install Dependencies:

Make sure you have Node.js and PostgreSQL installed. Then, install the dependencies by running:

bash
npm install

Set Up the Database:

Create a PostgreSQL database and tables as per the Database Schema.
Populate the tables with some initial data if desired.
Configure Environment Variables:

Create a .env file in the root of the project and configure the following variables with your PostgreSQL credentials:

env
USER_NAME=your_username
PASSWORD=your_password
DBNAME=your_database_name

## Usage

Start the Application:

Run the application from the terminal with the following command:

bash
Copy code
node index.js
Follow the Prompts:

The application will display a menu with options. Choose an option by navigating with the arrow keys and pressing Enter.

Available Options:
View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Exit: You can exit the application by pressing Ctrl + C.

## Database Schema

This application relies on a PostgreSQL database with three tables: department, role, and employee.

Table Structure
Department Table:

id (Primary Key)
name
Role Table:

id (Primary Key)
title
salary
department_id (Foreign Key referencing department.id)
Employee Table:

id (Primary Key)
first_name
last_name
role_id (Foreign Key referencing role.id)
manager_id (Foreign Key referencing employee.id for self-referencing manager)

## Future Enhancements

Possible future improvements for this application:

Add functionality for deleting departments, roles, or employees.
Include validation for data entry, such as salary input.
Improve error handling and validation feedback messages.
Add search and filter options to view specific employees or roles.

## License

This project is licensed under the MIT License.


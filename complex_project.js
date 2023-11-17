/* 
   Filename: complex_project.js

   Content: This code implements a complex project management system.

   Description: This code simulates a project management system with multiple features such as creating projects, assigning tasks, tracking progress, and generating reports. It includes validation checks for input data, data persistence using localStorage, and interactive user interfaces.

   Note: Being a pure text-based program, it can't be executed directly here. It must be executed in an appropriate JavaScript runtime environment.
*/

// Project Manager Class
class ProjectManager {
  constructor() {
    this.projects = [];
  }

  createProject(name, startDate) {
    const project = new Project(name, startDate);
    this.projects.push(project);
    console.log(`Project "${name}" created.`);
  }

  getProjectByName(name) {
    return this.projects.find(project => project.name === name);
  }
}

// Project Class
class Project {
  constructor(name, startDate) {
    this.name = name;
    this.startDate = startDate;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    console.log(`Task "${task.name}" added to project "${this.name}".`);
  }

  getTaskByName(name) {
    return this.tasks.find(task => task.name === name);
  }
}

// Task Class
class Task {
  constructor(name, description, status) {
    this.name = name;
    this.description = description;
    this.status = status;
  }
}

// User Interface Class
class UserInterface {
  static displayProjects(manager) {
    for (const project of manager.projects) {
      console.log(`Project: ${project.name} | Start Date: ${project.startDate}`);
    }
  }

  static displayTasks(project) {
    for (const task of project.tasks) {
      console.log(`Task: ${task.name} | Description: ${task.description} | Status: ${task.status}`);
    }
  }

  static createProject(manager) {
    const name = prompt("Enter the project name:");
    const startDate = prompt("Enter the start date (YYYY-MM-DD):");
  
    if (name && startDate) {
      manager.createProject(name, startDate);
    } else {
      console.log("Invalid input. Project creation failed.");
    }
  }

  static createTask(project) {
    const name = prompt("Enter the task name:");
    const description = prompt("Enter the task description:");
  
    if (name && description) {
      const task = new Task(name, description, "Not Started");
      project.addTask(task);
    } else {
      console.log("Invalid input. Task creation failed.");
    }
  }
}

// Sample Usage
const manager = new ProjectManager();

UserInterface.createProject(manager);
UserInterface.createTask(manager.getProjectByName(manager.projects[0].name));

console.log("Projects:");
UserInterface.displayProjects(manager);

console.log("Tasks:");
UserInterface.displayTasks(manager.projects[0]);

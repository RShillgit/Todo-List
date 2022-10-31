import _ from 'lodash';
import './style.css';

// Elements
const newProjectButton = document.getElementById('newProject');
const projectCreation = document.querySelector('.projectCreation');
const inputProjectName = document.getElementById('projectName');
const createProjectButton = document.getElementById('createProject')
const currentProjects = document.querySelector('.projects');

const createNewTodoButton = document.getElementById('createNewTodo');
const createTodoButton = document.getElementById('createTodo');
const todoCreation = document.querySelector('.todoItemCreation');

const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputDueDate = document.getElementById('dueDate');
const inputPriority = document.getElementById('priority');

// Array of Projects
let  projects = [];


// Factory function that creates Todo Item objects
function todoItem(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
};


// Displays projects in the sidebar
function projectDisplay() {

    // No project display
    if (projects.length < 1) {
        currentProjects.innerText = 'No Current Projects';
    }
    else {
        currentProjects.innerText = '';
        // Create divs for each project
        projects.forEach(project => {
            const projectFolder = document.createElement('div');
            projectFolder.classList = 'projectFolder';
            projectFolder.innerText = project;
        
            currentProjects.appendChild(projectFolder);
        });
    }

};
projectDisplay();


// Handles Project Creation and Selection
function sidebarInteraction() {

    // Handle User Project Creation
    newProjectButton.addEventListener('click', () => {return projectCreation.style.display = 'Flex'});
    createProjectButton.addEventListener('click', () => {

        // Push project to projects array
        projects.push(inputProjectName.value)
    
        // Clear input field 
        inputProjectName.value = '';
        
        // Remove project creation window
        projectCreation.style.display = 'none';

        return projectDisplay();
    });
};
sidebarInteraction();


function todoInteration() {
    createNewTodoButton.addEventListener('click', () => {return todoCreation.style.display = 'Flex'});

    // Handles user input for creating a new Todo Item
    createTodoButton.addEventListener('click', () => {
        const newTodoTitle = inputTitle.value;
        const newTodoDescription = inputDescription.value;
        const newTodoDueDate = inputDueDate.value;
        const newTodoPriority = inputPriority.value;

        // Create new todoItem with these values
        const object = new todoItem(newTodoTitle, newTodoDescription, newTodoDueDate, newTodoPriority);

        // Send this object to a todo card display function
    });
}
todoInteration();




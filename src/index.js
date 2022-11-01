import _ from 'lodash';
import './style.css';

// Elements
const newProjectButton = document.getElementById('newProject');
const projectCreation = document.querySelector('.projectCreation');
const inputProjectName = document.getElementById('projectName');
const createProjectButton = document.getElementById('createProject')
const currentProjects = document.querySelector('.projects');

const todoSection = document.querySelector('.todoSection');
const createNewTodoButton = document.getElementById('createNewTodo');
const createTodoButton = document.getElementById('createTodo');
const todoCreation = document.querySelector('.todoItemCreation');
const todoInputFields = document.querySelectorAll('.todoInfo');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputDueDate = document.getElementById('dueDate');
const inputPriority = document.getElementById('priority');

// Array of Projects
let  projects = [];

// Variable to hold selected project
let selectedProject;

// Factory function that creates projects
function todoProject(name) {
    this.name = name;
    this.info = [];
    this.selected = false;
}
todoProject.prototype.select = function() {
    this.selected = true;
}

// Factory function that creates Todo Item objects
function todoItem(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.displayed = false;
};


// Displays projects in the sidebar
function projectHandler() {

    // Clear no projects message
    currentProjects.innerText = '';

    // Create div for the projects
    projects.forEach(project => {
        const projectFolder = document.createElement('div');
        projectFolder.classList = 'projectFolder';
        projectFolder.innerText = project.name;
    
        currentProjects.appendChild(projectFolder); 
    })

    // run the project selector function
    return projectSelector();
};


// Handles Project Creation and Selection
function sidebarInteraction() {

    // Handle User Project Creation
    newProjectButton.addEventListener('click', () => {return projectCreation.style.display = 'Flex'});
    createProjectButton.addEventListener('click', () => {

        // Error Handling
        if (inputProjectName.value.length < 1) return; 

        // Make new project object
        const projectObject = new todoProject(inputProjectName.value)

        // Push new project object to projects array
        projects.push(projectObject);
    
        // Clear input field 
        inputProjectName.value = '';

        // Remove project creation window
        projectCreation.style.display = 'none';

        // Run the project handler function
        return projectHandler();
    });
};
sidebarInteraction();


// Function that allows user to select a project 
function projectSelector() {
   
    // If there are no projcets then return
    if (projects.length < 1) return;

    else {
         // Get all projects
        const allProjects = document.querySelectorAll('.projectFolder');

        allProjects.forEach(projectFolder => {

            projectFolder.addEventListener('click', (e) => {    
    
                for (let i = 0; i < projects.length; i++) {

                    // Set all of the object's selected properties to false
                    projects[i].selected = false;

                    // Get selected project, save it and change its selected property to true
                    if (projects[i].name == e.target.innerHTML) {
                        projects[i].selected = true
                        selectedProject = projects[i];

                        // Send selected project object to viewTodoSection function
                        return displayTodoSection();
                    };
                };
            });
        });
    }; 
};


function displayTodoSection() {

    // Display todoSection
    todoSection.style.display = 'Flex';

    // Check the project for any todo items and display them  
    if (selectedProject.info.length >= 1) {
        selectedProject.info.forEach(todoItem => {

            // If the item is not displayed yet
            if (todoItem.displayed == false) {

                // Div that holds todo Items
                const todoItemsContainer = document.querySelector('.todoItems'); 

                // Create a card that displays the todo item information
                const itemCardDiv = document.createElement('div');
                itemCardDiv.classList = 'itemCard';

                // Title
                const itemCardTitle = document.createElement('p');
                itemCardTitle.innerHTML = `Title: ${todoItem.title}`;

                // Description
                const itemCardDescription = document.createElement('p');
                itemCardDescription.innerHTML = `Description: ${todoItem.description}`;

                // Due Date
                const itemCardDate = document.createElement('p');
                itemCardDate.innerHTML = `Due Date: ${todoItem.dueDate}`;

                // Priority
                const itemCardPriority = document.createElement('p');
                itemCardPriority.innerHTML = `Priority: ${todoItem.priority}`;

                // Change todoItem's displayed property to true
                todoItem.displayed = true;

                // Append info to card div
                itemCardDiv.appendChild(itemCardTitle);
                itemCardDiv.appendChild(itemCardDescription);
                itemCardDiv.appendChild(itemCardDate);
                itemCardDiv.appendChild(itemCardPriority);

                // Append card div to container
                todoItemsContainer.appendChild(itemCardDiv);

                
            };
        });
    };
};


function createTodoItem() {

    // If user clicks Create New Todo button render todo form
    createNewTodoButton.addEventListener('click', () => {

        if (todoCreation.style.display === 'flex') return todoCreation.style.display = 'none';
        else return todoCreation.style.display = 'flex';

    });

    // Handle user input for creating a new Todo Item
    createTodoButton.addEventListener('click', () => {

        // Error handling on all the input fields 
        for (let i = 0; i < todoInputFields.length; i++) {
            if (todoInputFields[i].value.length < 1) return alert("All Fields Required");
        }

        const newTodoTitle = inputTitle.value;
        const newTodoDescription = inputDescription.value;
        const newTodoDueDate = inputDueDate.value;
        const newTodoPriority = inputPriority.value;

        // Create new todoItem with these values
        const todoObject = new todoItem(newTodoTitle, newTodoDescription, newTodoDueDate, newTodoPriority);
        
        // Push new todoItem to the project's info array
        selectedProject.info.push(todoObject);

        // Clear input fields 
        todoInputFields.forEach((field) => {field.value = ''});

        // Remove todo creation window
        todoCreation.style.display = 'none';

        // Run displayTodo function
        return displayTodoSection();
    });
};
createTodoItem();



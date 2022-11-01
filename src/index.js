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

        // Add event listener to all of the projects
        allProjects.forEach(projectFolder => {
            projectFolder.addEventListener('click', (e) => {

                // Variable to hold selected project
                let selectedProject;
                
                for (let i = 0; i < projects.length; i++) {
                    // Set all of the object's selected property to false
                    projects[i].selected = false;


                    // Get selected project, save it and change its selected property to true
                    if (projects[i].name == e.target.innerHTML) {
                        projects[i].selected = true
                        selectedProject = projects[i];
                    };
                };

                // Send selected project object to viewTodoSection function
                return vewTodoSection(selectedProject);
            });
        });
    }; 
};


function vewTodoSection(project) {
    // Display todoSection
    todoSection.style.display = 'Flex';

    console.log(project)
    console.log(project.info)

    // Handle creating and displaying new todos? 
};

// This function should only run when a project is selected
function todoInteration() {
    createNewTodoButton.addEventListener('click', () => {return todoCreation.style.display = 'Flex'});

    // Handles user input for creating a new Todo Item
    createTodoButton.addEventListener('click', () => {
        const newTodoTitle = inputTitle.value;
        const newTodoDescription = inputDescription.value;
        const newTodoDueDate = inputDueDate.value;
        const newTodoPriority = inputPriority.value;

        // Create new todoItem with these values
        const todoObject = new todoItem(newTodoTitle, newTodoDescription, newTodoDueDate, newTodoPriority);
        console.log(todoObject);

        // Clear input fields 
        todoInputFields.forEach(field => field.value = '');

        // Remove todo creation window
        todoCreation.style.display = 'none';

        // Add this todo item to the selected project

        // Send this object to a todo card display function
    });
}
todoInteration();




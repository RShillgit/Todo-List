import _ from 'lodash';
import './style.css';

// Elements
const newProjectButton = document.getElementById('newProject');
const projectCreation = document.querySelector('.projectCreation');
const inputProjectName = document.getElementById('projectName');
const createProjectButton = document.getElementById('createProject')
const currentProjects = document.querySelector('.projects');

const todoSection = document.querySelector('.todoSection');
const todoItemsContainer = document.querySelector('.todoItems');
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

                    // If user selected a project previously
                    if (selectedProject != undefined) {

                        // Clear all todo items from container
                        todoItemsContainer.innerHTML = '';

                        // Make todo items display properties false
                        selectedProject.info.forEach(todoItem => todoItem.displayed = false);
                    }

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

                // Create a card that displays the todo item information
                const itemCardDiv = document.createElement('div');
                itemCardDiv.classList = 'itemCard';
                // Set the cards id to the objects title so it can be identified later
                itemCardDiv.setAttribute('id', todoItem.title);

                // Div that will hold the edit and delete buttons
                const alterDiv = document.createElement('div');
                alterDiv.classList = 'alterButtons';

                // Edit button
                const editButton = document.createElement('button');
                editButton.setAttribute('id', 'edit');
                editButton.innerHTML = 'edit';  // Can be delete once replaced with image
                editButton.addEventListener('click', (e) => editItem(e));

                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.setAttribute('id', 'delete');
                deleteButton.innerHTML = 'delete'; // Can be delete once replaced with image
                deleteButton.addEventListener('click', (e) => deleteItem(e));

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

                // Apeend buttons to alter div
                alterDiv.appendChild(editButton);
                alterDiv.appendChild(deleteButton);

                // Append info to card div
                itemCardDiv.appendChild(alterDiv);
                itemCardDiv.appendChild(itemCardTitle);
                itemCardDiv.appendChild(itemCardDescription);
                itemCardDiv.appendChild(itemCardDate);
                itemCardDiv.appendChild(itemCardPriority);

                // Append card div to container
                todoItemsContainer.appendChild(itemCardDiv);

            };
        });
    }
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


function editItem(e) {

    // The todo item the user interacted with
    const todoItemForEdit = e.target.parentElement.parentElement

    // Change the class of todoItemForEdit so it expands to fill the page
    todoItemForEdit.classList = 'itemCardEditing';

    // "Remove" Edit and Delete Button
    const edit = document.querySelector('.itemCardEditing').querySelector('#edit');
    edit.style.display = 'none';
    const del = document.querySelector('.itemCardEditing').querySelector('#delete');
    del.style.display = 'none';

    // Add an exit button to the alterButtons div
    const alterButtonsDiv = document.querySelector('.itemCardEditing').querySelector('.alterButtons');
    const exitBtn = document.createElement('button');
    exitBtn.setAttribute('id', 'exit');
    exitBtn.innerHTML = 'Exit';
    alterButtonsDiv.appendChild(exitBtn);

    // Add a submit changes button
    const submitChangesDiv = document.createElement('div');
    submitChangesDiv.classList = 'submitChanges';
    const submitChangesBtn = document.createElement('button')
    submitChangesBtn.innerHTML = 'Submit Changes';
    submitChangesBtn.setAttribute('id', 'submitChangesBtn');

    // Append submit changes button to todo item
    submitChangesDiv.appendChild(submitChangesBtn);
    todoItemForEdit.appendChild(submitChangesDiv);

    // Exit button event listener
    exitBtn.addEventListener('click', (e) => {

        // Set class back to normal
        todoItemForEdit.classList = 'itemCard';

        // Remove exit button
        exitBtn.remove();

        // Remove submit changes div
        submitChangesDiv.remove();

        // Show edit and delete buttons
        edit.style.display = 'block';
        del.style.display = 'block';

    });

    // Submit Changes button event listener

    // Change each paragraph to an input field with the value being the pre-edited value
    // Once changes are submitted change class back to original with changed information
    // Or change the objects information first then run the display todosection function so it regenerates
    // To change todoItem's info do same loop as delete button
    // then change selectedProject.info.<Field Changed> to the new information 

};

function deleteItem(e) {

    // The todo item the user interacted with
    const todoItemForDeletion = e.target.parentElement.parentElement

    // Delete parent element from DOM (the todo item)
    todoItemForDeletion.remove();

    // Delete todoObject from project's info array
    for (let i = 0; i < selectedProject.info.length; i++) {

        // If the title of a todoObject matches the todoItemForDeletion's id
        if (selectedProject.info[i].title == todoItemForDeletion.id) {

            // Remove the todo Object from the projects array
            selectedProject.info.splice(i, 1);
        };
    };
}

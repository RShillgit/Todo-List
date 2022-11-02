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
        // Div
        const projectFolder = document.createElement('div');
        projectFolder.classList = 'projectFolder';

        // Name
        const projectFolderName = document.createElement('p');
        projectFolderName.innerHTML = project.name;
        projectFolder.setAttribute('id', project.name);

        // Delete button
        const projectDeleteButton = document.createElement('button');
        projectDeleteButton.innerHTML = "x" // Change for an icon later
        projectDeleteButton.addEventListener('click', (e) => deleteProject(e));

        // Append everything to the project folder
        projectFolder.appendChild(projectFolderName);
        projectFolder.appendChild(projectDeleteButton);
        currentProjects.appendChild(projectFolder); 
    })

    // run the project selector function
    return projectSelector();
};


// Handles Project Creation and Selection
function sidebarInteraction() {

    if (projects.length < 1) { currentProjects.innerHTML = 'No Projects to Display'};

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

            const clickableProject = projectFolder.querySelector('p');

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

    // "Remove" each paragraph
    const paragraphs = document.querySelector('.itemCardEditing').querySelectorAll('p');
    paragraphs.forEach(p => p.style.display = 'none');

    // Find the object that is being edited
    for (let i = 0; i < selectedProject.info.length; i++) {
        if (selectedProject.info[i].title == todoItemForEdit.id) {

            // Add input fields for each item property
            // Title
            const editTitleLabel = document.createElement('label');
            editTitleLabel.innerHTML = 'Title: ';
            const editTitle = document.createElement('input');
            editTitle.setAttribute('id', 'editedTitle');
            editTitle.value = selectedProject.info[i].title;
            editTitleLabel.appendChild(editTitle);
            
            // Description
            const editDescriptionLabel = document.createElement('label')
            editDescriptionLabel.innerHTML = 'Description: ';
            const editDescription = document.createElement('input');
            editDescription.setAttribute('id', 'editedDescription');
            editDescription.value = selectedProject.info[i].description;
            editDescriptionLabel.appendChild(editDescription);

            // Due Date
            const editDueDateLabel = document.createElement('label')
            editDueDateLabel.innerHTML = 'Due Date: ';
            const editDueDate = document.createElement('input');
            editDueDate.setAttribute('id', 'editedDueDate');
            editDueDate.value = selectedProject.info[i].dueDate;
            editDueDateLabel.appendChild(editDueDate);

            // Priority
            const editPriorityLabel = document.createElement('label')
            editPriorityLabel.innerHTML = 'Priority: ';
            const editPriority = document.createElement('input');
            editPriority.setAttribute('id', 'editedPriority');
            editPriority.value = selectedProject.info[i].priority;
            editPriorityLabel.appendChild(editPriority);

            // Add input fields to item card editing div
            todoItemForEdit.appendChild(editTitleLabel);
            todoItemForEdit.appendChild(editDescriptionLabel);
            todoItemForEdit.appendChild(editDueDateLabel);
            todoItemForEdit.appendChild(editPriorityLabel);

        };
    }

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
    exitBtn.addEventListener('click', () => {

        // Remove edit input fields
        const editLabels = document.querySelector('.itemCardEditing').querySelectorAll('label')
        editLabels.forEach(label => label.remove());

        // Set class back to normal
        todoItemForEdit.classList = 'itemCard';

        // Remove exit button
        exitBtn.remove();

        // Remove submit changes div
        submitChangesDiv.remove();

        // Show old input fields, edit button, and delete button
        paragraphs.forEach(p => p.style.display = 'flex');
        edit.style.display = 'block';
        del.style.display = 'block';

    });

    // Submit Changes button event listener
    submitChangesBtn.addEventListener('click', () => {

        // Get the values of each input field 
        const editedTitle = document.querySelector('.itemCardEditing').querySelector('#editedTitle');
        const editedDescription = document.querySelector('.itemCardEditing').querySelector('#editedDescription');
        const editedDueDate = document.querySelector('.itemCardEditing').querySelector('#editedDueDate');
        const editedPriority = document.querySelector('.itemCardEditing').querySelector('#editedPriority');

        // Get the current object
        for (let i = 0; i < selectedProject.info.length; i++) {
            if(selectedProject.info[i].title == todoItemForEdit.id) {

                // Update the object's values
                selectedProject.info[i].title = editedTitle.value;
                selectedProject.info[i].description = editedDescription.value;
                selectedProject.info[i].dueDate = editedDueDate.value;
                selectedProject.info[i].priority = editedPriority.value;
            }
            // Set all of the projects displayed values to false so they will be properly rerendered
            selectedProject.info[i].displayed = false;
        }

        // Clear all todoItems
        todoItemsContainer.innerHTML = '';

        // Remove edit screen
        todoItemForEdit.remove();

        // Run displayTodo function
        return displayTodoSection();
    });
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
};

function deleteProject(e) {

    // Project to be deleted
    const projectForDeletion = e.target.parentElement

    // Loop through projects array
    for (let i = 0; i < projects.length; i++) {

        // find the project the user wants to delete
        if (projects[i].name == projectForDeletion.id) {

            // Remove project from the projects array
            projects.splice(i, 1);

            // Remove project from the DOM
            projectForDeletion.remove();
        }
    }

    return sidebarInteraction();
};

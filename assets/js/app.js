// Define UI Variables 
const taskInput = document.querySelector('#task'); //the task input text field
const form = document.querySelector('#task-form'); //The form at the top
const filter = document.querySelector('#filter'); //the task filter text field
const taskList = document.querySelector('.collection'); //The UL
const clearBtn = document.querySelector('.clear-tasks'); //the all task clear button

const reloadIcon = document.querySelector('.fa'); //the reload button at the top navigation 

// Add Event Listener  [Form , clearBtn and filter search input ]

// form submit 
form.addEventListener('submit', addNewTask);
// Clear All Tasks
clearBtn.addEventListener('click', clearAllTasks);
//   Filter Task 
filter.addEventListener('keyup', filterTasks);
// Remove task event [event delegation]
taskList.addEventListener('click', removeTask);
// Event Listener for reload 
reloadIcon.addEventListener('click', reloadPage);


document.addEventListener("DOMContentLoaded", loadTasksFromDB)


// Add New  Task Function definition 
function addNewTask(e) {

    e.preventDefault(); //disable form submission


    // Check empty entry
    if (taskInput.value === '') {
        taskInput.style.borderColor = "red";

        return;
    }

    // Create an li element when the user adds a task 
    const li = document.createElement('li');
    // Adding a class
    li.className = 'collection-item';
    // Create text node and append it 
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new element for the link 
    const link = document.createElement('a');
    // Add class and the x marker for a 
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append to UL 
    taskList.appendChild(li);
    addToDatabase(taskInput.value)



}





// Clear Task Function definition 
function clearAllTasks() {

    //This is the first way 
    // taskList.innerHTML = '';

    //  Second Wy 
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearAllTasksfromDB()

}



// Filter tasks function definition 
function filterTasks(e) {



}

// Remove Task function definition 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure about that ?')) {
            e.target.parentElement.parentElement.remove();

        }
        removefromDB(e.target.parentElement.parentElement.childNodes[0]);

    }
}


// Reload Page Function 
function reloadPage() {
    //using the reload fun on location object 
    location.reload();
}

function loadTasksFromDB() {
    let listofTasks = loadfromDB();
    if (listofTasks.length != 0) {

        listofTasks.forEach(function (eachTask) {

            const li = document.createElement('li');             // Create an li element when the user adds a task
            li.className = 'collection-item';                                                  // Adding a class
            li.appendChild(document.createTextNode(eachTask));            // Create text node and append it 
            const link = document.createElement('a');                        // Create new element for the link 
            link.className = 'delete-item secondary-content';          // Add class and the x marker for a 
            link.innerHTML = '<i class="fa fa-remove"> </i>';
            li.appendChild(link);                                                    // Append link to li
            taskList.appendChild(li);                                            // Append to UL 
        });
    }


}
// Define UI Variables 
const taskInput = document.querySelector('#task'); //the task input text field
const form = document.querySelector('#task-form'); //The form at the top
const filter = document.querySelector('#filter'); //the task filter text field
const taskList = document.querySelector('.collection'); //The UL
const clearBtn = document.querySelector('.clear-tasks'); //the all task clear button
const reloadIcon = document.querySelector('.fa'); //the reload button at the top navigation 
let DB;
// Add Event Listener  [Form , clearBtn and filter search input ]
const asc = document.querySelector(".Ascending")
const dsc = document.querySelector(".Descending")

// document.addEventListener("DOMContentLoaded", loadTasksFromDB)


document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", addNewTask)
    clearBtn.addEventListener("click", clearAllTasks)
    taskList.addEventListener("click", removeTask)
    let taskDB = indexedDB.open("tasks", 1)
    asc.addEventListener("click", sortAscending)
    dsc.addEventListener("click", sortDescending)
    let sortOrder = "dsc"
    taskDB.onsuccess = function (e) {
        console.log("it was a success !!!");
        DB = taskDB.result
        displayTaskList()


    }

    taskDB.onerror = function (e) {
        console.log("there is sth wrong!!!");
    }
    taskDB.onupgradeneeded = function (e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('taskname', 'taskname', { unique: false });
        console.log('Database ready and fields created!');

    }
    function addNewTask(e) {
        e.preventDefault();
        let newTask = {
            taskname: taskInput.value,
            added_at: new Date()
        }
        let transaction = DB.transaction(["tasks"], 'readwrite');
        let objectStore = transaction.objectStore("tasks");

        let request = objectStore.add(newTask)

        request.onsuccess = () => {
            form.reset()
            displayTaskList(sortOrder)
        }
        transaction.oncomplete = () => {
            console.log("the transaction completed");
        }
        transaction.onerror = () => {
            console.log("transaction error");
        }
    }

    function displayTaskList(order) {
        // clear the previous task list
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        let objectStore = DB.transaction('tasks').objectStore('tasks');
        if (sortOrder == "Asc") {
            console.log("Asc");
            objectStore.openCursor().onsuccess = function (e) {
                // assign the current cursor
                let cursor = e.target.result;
                if (cursor) {
                    // Create an li element when the user adds a task 
                    const li = document.createElement('li');
                    //add Attribute for delete 
                    li.setAttribute('data-task-id', cursor.value.id);
                    // Adding a class
                    li.className = 'collection-item';
                    // Create text node and append it 
                    li.appendChild(document.createTextNode(cursor.value.taskname));
                    // Create new element for the link 
                    const link = document.createElement('a');
                    // Add class and the x marker for a 
                    link.className = 'delete-item secondary-content';
                    link.innerHTML = `
                             <i class="fa fa-remove"></i>
                            &nbsp;
                            <a href="/Lesson 04 [Lab 06]/Finished/edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a>
                            `;
                    // Append link to li
                    li.appendChild(link);
                    // Append to UL 
                    const dateItem = document.createElement("a")
                    dateItem.innerHTML = `${cursor.value.added_at}`;
                    dateItem.style.display = "none"
                    li.appendChild(dateItem);
                    taskList.appendChild(li);
                    cursor.continue();
                }
            }
        } else {
            objectStore.openCursor(null, "prev").onsuccess = function (e) {
                // assign the current cursor
                let cursor = e.target.result;
                if (cursor) {
                    // Create an li element when the user adds a task 
                    const li = document.createElement('li');
                    //add Attribute for delete 
                    li.setAttribute('data-task-id', cursor.value.id);
                    // Adding a class
                    li.className = 'collection-item';
                    // Create text node and append it 
                    li.appendChild(document.createTextNode(cursor.value.taskname));
                    // Create new element for the link 
                    const link = document.createElement('a');
                    // Add class and the x marker for a 
                    link.className = 'delete-item secondary-content';
                    link.innerHTML = `
                             <i class="fa fa-remove"></i>
                            &nbsp;
                            <a href="/Lesson 04 [Lab 06]/Finished/edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a>
                            `;
                    // Append link to li
                    li.appendChild(link);
                    // Append to UL 
                    const dateItem = document.createElement("a")
                    dateItem.innerHTML = `${cursor.value.added_at}`;
                    dateItem.style.display = "none"
                    li.appendChild(dateItem);
                    taskList.appendChild(li);
                    cursor.continue();
                }
            }

        }

    }
    function clearAllTasks(e) {
        let transaction = DB.transaction("tasks", "readwrite")
        let tasks = transaction.objectStore("tasks")
        let cleared = tasks.clear()
        displayTaskList()
    }
    function removeTask(e) {
        if (e.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are You Sure about that ?')) {
                let taskID = Number(e.target.parentElement.parentElement.getAttribute('data-task-id'));
                let transaction = DB.transaction(['tasks'], 'readwrite');
                let objectStore = transaction.objectStore('tasks');
                objectStore.delete(taskID);
                transaction.oncomplete = () => {
                    e.target.parentElement.parentElement.remove();
                }

            }
        }
    }


    function sortAscending() {
        sortOrder = "Asc"
        console.log("asc function");
        displayTaskList()
        
    }
    function sortDescending() {
        console.log("dsc function");
        sortOrder = "dsc"
        displayTaskList()
        
    }
})




// // Add New  Task Function definition
// function addNewTask(e) {

//     e.preventDefault(); //disable form submission


//     // Check empty entry
//     if (taskInput.value === '') {
//         taskInput.style.borderColor = "red";

//         return;
//     }

//     // Create an li element when the user adds a task 
//     const li = document.createElement('li');
//     // Adding a class
//     li.className = 'collection-item';
//     // Create text node and append it 
//     li.appendChild(document.createTextNode(taskInput.value));
//     // Create new element for the link 
//     const link = document.createElement('a');
//     // Add class and the x marker for a 
//     link.className = 'delete-item secondary-content';
//     link.innerHTML = '<i class="fa fa-remove"></i>';
//     // Append link to li
//     li.appendChild(link);
//     // Append to UL 
//     taskList.appendChild(li);
//     addToDatabase(taskInput.value)



// }





// // Clear Task Function definition 
// function clearAllTasks() {

//     //This is the first way 
//     // taskList.innerHTML = '';

//     //  Second Wy 
//     while (taskList.firstChild) {
//         taskList.removeChild(taskList.firstChild);
//     }

//     clearAllTasksfromDB()

// }



// // Filter tasks function definition 
// function filterTasks(e) {



// }

// // Remove Task function definition 
// function removeTask(e) {
//     if (e.target.parentElement.classList.contains('delete-item')) {
//         if (confirm('Are You Sure about that ?')) {
//             e.target.parentElement.parentElement.remove();

//         }
//         removefromDB(e.target.parentElement.parentElement.childNodes[0]);

//     }
// }


// // Reload Page Function 
// function reloadPage() {
//     //using the reload fun on location object 
//     location.reload();
// }

// function loadTasksFromDB() {
//     let listofTasks = loadfromDB();
//     if (listofTasks.length != 0) {

//         listofTasks.forEach(function (eachTask) {

//             const li = document.createElement('li');             // Create an li element when the user adds a task
//             li.className = 'collection-item';                                                  // Adding a class
//             li.appendChild(document.createTextNode(eachTask));            // Create text node and append it 
//             const link = document.createElement('a');                        // Create new element for the link 
//             link.className = 'delete-item secondary-content';          // Add class and the x marker for a 
//             link.innerHTML = '<i class="fa fa-remove"> </i>';
//             li.appendChild(link);                                                    // Append link to li
//             taskList.appendChild(li);                                            // Append to UL 
//         });
//     }


// }
function addToDatabase(newTask) {
    let listofTasks;
    if (localStorage.getItem('tasks') == null) {
        listofTasks = [];
    }
    else {
        listofTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    listofTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(listofTasks));
    console.log("success");
}


function loadfromDB() {
    let tasks = localStorage.getItem("tasks")
    if (tasks == null) {
        return []
    } else {

        return JSON.parse(tasks)
    }

}

function clearAllTasksfromDB() {
    localStorage.clear()
}
function removefromDB(taskItem) {
    let listofTasks
    if (localStorage.getItem("tasks") == null) {
        listofTasks = []
    } else {
        listofTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    listofTasks.forEach(function (task, index) {
        if (taskItem.wholeText.trim() === task.trim())
            listofTasks.splice(index, 1);
    });
    localStorage.setItem('tasks', JSON.stringify(listofTasks));

}
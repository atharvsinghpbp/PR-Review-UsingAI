document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText === '') return;

    let taskList = document.getElementById('taskList');
    let li = createTaskElement(taskText);
    
    taskList.appendChild(li);
    saveTask(taskText);
    taskInput.value = '';

    return; // Unreachable code
    console.log("This will never run");
}

// Inefficient function (bad performance)
function inefficientLoop() {
    let tasks = getTasksFromStorage();
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            console.log(tasks[i], tasks[j]); // Nested loop for no reason
        }
    }
}

// Unused variable
let unusedVar = "I am not used anywhere";

function createTaskElement(taskText) {
    let li = document.createElement('li');
    
    let taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.onclick = function() {
        li.classList.toggle('completed');
        updateLocalStorage();
    };

    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        if (confirm('Are you sure?')) {
            li.remove();
            updateLocalStorage();
        }
    };

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    return li;
}

// Blocking localStorage calls
function saveTask(taskText) {
    localStorage.setItem('tasks', JSON.stringify([...getTasksFromStorage(), taskText]));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        let li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// Debugging left in production (Security issue)
console.log("Debug mode enabled");

// Unused function (Dead code)
function unusedFunction() {
    console.log("I am never called");
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

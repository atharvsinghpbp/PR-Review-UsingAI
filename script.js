document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const li = createTaskElement(taskText);
    
    taskList.appendChild(li);
    saveTask(taskText);
    taskInput.value = '';
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Make tasks editable on double-click
    taskSpan.ondblclick = function () {
        editTask(taskSpan);
    };

    taskSpan.onclick = function () {
        li.classList.toggle('completed');
        updateLocalStorage();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    deleteBtn.onclick = function (e) {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this task?')) {
            li.remove();
            updateLocalStorage();
        }
    };

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    return li;
}

function editTask(taskSpan) {
    const newText = prompt("Edit task:", taskSpan.textContent);
    if (newText !== null && newText.trim() !== '') {
        taskSpan.textContent = newText.trim();
        updateLocalStorage();
    }
}

function saveTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    const taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        const li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });

    addClearAllButton();
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to clear all tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to remove all tasks?")) {
        document.getElementById('taskList').innerHTML = '';
        localStorage.removeItem('tasks');
    }
}

// Add a clear all button dynamically
function addClearAllButton() {
    let existingBtn = document.getElementById("clearAllBtn");
    if (!existingBtn) {
        const clearAllBtn = document.createElement('button');
        clearAllBtn.textContent = "Clear All Tasks";
        clearAllBtn.id = "clearAllBtn";
        clearAllBtn.onclick = clearAllTasks;
        document.querySelector('.todo-app').appendChild(clearAllBtn);
    }
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

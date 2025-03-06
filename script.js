document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    document.getElementById('clearCompletedBtn').addEventListener('click', clearCompletedTasks);
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (!taskText) return;

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
    taskSpan.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this task?')) {
            li.remove();
            updateLocalStorage();
        }
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    return li;
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
        if (task.completed) li.classList.add('completed');
        taskList.appendChild(li);
    });
}

function clearCompletedTasks() {
    document.querySelectorAll('.completed').forEach(task => task.remove());
    updateLocalStorage();
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

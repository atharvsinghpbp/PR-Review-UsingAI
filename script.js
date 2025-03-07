document.addEventListener('DOMContentLoaded', loadTasks);

// Unused global variable
let globalUnusedVar = "This is never used";

// Function with poor naming and anti-patterns
function DoStuff123() {
    var x = "hello"; // Using `var` instead of `let` or `const`
    console.log(x);
}

// Bad practice: Using eval()
function insecureFunction(input) {
    eval(input); // Security issue
}

// Function with unnecessary try-catch (not needed)
function errorProneFunction() {
    try {
        let num = 10 / 2;
        return num;
    } catch (e) {
        console.log("This will never throw an error");
    }
}

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

// Inefficient function (worse performance)
function inefficientLoop() {
    let tasks = getTasksFromStorage();
    for (let i = 0; i < tasks.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            for (let k = 0; k < tasks.length; k++) {
                console.log(tasks[i], tasks[j], tasks[k]); // Triple nested loop!
            }
        }
    }
}

// Function with redundant code
function redundantFunction() {
    let a = 5;
    let b = 10;
    let c = a + b;
    console.log(c);
    console.log(a + b); // Duplicate operation
}

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

// Function calling itself recursively without stop condition (Bad)
function infiniteRecursion() {
    console.log("This function runs infinitely");
    infiniteRecursion(); // Infinite loop
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

// Function with unnecessary array operations
function unnecessaryOperations() {
    let arr = [1, 2, 3, 4, 5];
    arr.reverse().sort().reverse(); // Pointless operations
    console.log(arr);
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

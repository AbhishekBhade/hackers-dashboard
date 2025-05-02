// Task management system
let tasks = [];

// Function to add a task
function addTask(taskName, dueDate) {
    const task = {
        id: Date.now(),
        name: taskName,
        dueDate: dueDate,
        completed: false
    };
    tasks.push(task);
    updateTaskList();
}

// Function to mark a task as complete/incomplete
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        updateTaskList();
    }
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    updateTaskList();
}

// Function to clear all tasks
function clearAllTasks() {
    tasks = [];
    updateTaskList();
}

// Function to update the task list display
function updateTaskList() {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = ''; // Clear the existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">✔</button>
                <button onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        taskListElement.appendChild(taskItem); // Append the task to the list
    });

    updateProgressBar(); // Update the progress bar
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = `${progressPercentage}%`;
}

// Event listener for adding a task
document.getElementById('add-task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    if (taskName && dueDate) {
        addTask(taskName, dueDate);
        this.reset(); // Clear the form after submission
    }
});

// Event listener for clearing all tasks
document.getElementById('clear-tasks').addEventListener('click', clearAllTasks);

// Hacker-style clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

// Call updateClock every second
setInterval(updateClock, 1000);
updateClock();

// Function to generate the calendar for the current month
function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get the first and last day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Create the calendar table
    let calendarHTML = '<table>';
    calendarHTML += '<tr>';
    daysOfWeek.forEach(day => {
        calendarHTML += `<th>${day}</th>`;
    });
    calendarHTML += '</tr><tr>';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<td></td>';
    }

    // Add the days of the month
    for (let date = 1; date <= lastDate; date++) {
        const currentDay = new Date(year, month, date).getDay();
        const isToday = date === now.getDate();
        calendarHTML += `<td class="${isToday ? 'today' : ''}">${date}</td>`;

        // Start a new row after Saturday
        if (currentDay === 6 && date !== lastDate) {
            calendarHTML += '</tr><tr>';
        }
    }

    calendarHTML += '</tr></table>';
    calendarElement.innerHTML = calendarHTML;
}

// Call the generateCalendar function
generateCalendar();

// Matrix background animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('matrix-background').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, x) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }
        drops[x]++;
    });
}

setInterval(drawMatrix, 50);
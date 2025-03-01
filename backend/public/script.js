// Register User
function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}

// Login User
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}

// Add Task
function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const status = document.getElementById("taskStatus").value;

    fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadTasks(); // Refresh task list
    })
    .catch(error => console.error("Error:", error));
}

// Load Tasks
function loadTasks() {
    fetch("http://localhost:5000/tasks")
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title} - ${task.description} [${task.status}]`;
            taskList.appendChild(li);
        });
    })
    .catch(error => console.error("Error:", error));
}

// Remove Completed Tasks
function removeCompletedTasks() {
    fetch("http://localhost:5000/tasks/completed", {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadTasks(); // Refresh task list
    })
    .catch(error => console.error("Error:", error));
}
function markTaskCompleted(taskId) {
    fetch(`http://localhost:5000/update-task/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show success message
        fetchTasks(); // Reload tasks after update
    })
    .catch(error => console.error("Error updating task:", error));
}

// Load tasks on page load
window.onload = loadTasks;

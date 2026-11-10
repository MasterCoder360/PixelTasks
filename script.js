const settingsBtn = document.getElementById('settingsBtn');

if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    document.body.classList.toggle('alt-theme');
  });
}

const STORAGE_KEY = 'simple_tasks';

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: 1, text: 'Setup project structure', completed: true },
  { id: 2, text: 'Write HTML and CSS', completed: false }
];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.className = 'task-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(task.id));

    const textNode = document.createTextNode(task.text);
    span.append(checkbox, textNode);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => removeTask(task.id));

    li.append(span, deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = '';
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') addTask();
});

renderTasks();

function updateDateTime() {
  const now = new Date();
  
  const datePart = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const timePart = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById('clock').textContent = `${datePart} | ${timePart}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const taskCounter = document.getElementById('taskCounter');
const filterButtons = document.querySelectorAll('.filter-btn');
const emptyState = document.getElementById('emptyState');

let tasks = [];
let currentFilter = 'all';
let isDark = true;

// ========== THEME TOGGLE ==========
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  body.className = isDark ? 'dark-mode' : 'light-mode';
  themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// ========== ADD TASK ==========
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === '') {
    taskInput.focus();
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
});

// ========== FILTER BUTTONS ==========
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

// ========== RENDER TASKS ==========
function renderTasks() {
  todoList.innerHTML = '';

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    if (task.completed) listItem.classList.add('completed');

    const taskLeft = document.createElement('div');
    taskLeft.classList.add('task-left');

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.setAttribute('aria-label', 'Mark task as complete');
    completeButton.addEventListener('click', () => toggleTask(task.id));

    const taskTextEl = document.createElement('p');
    taskTextEl.classList.add('task-text');
    taskTextEl.textContent = task.text;

    taskLeft.appendChild(completeButton);
    taskLeft.appendChild(taskTextEl);

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('aria-label', 'Delete task');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    taskActions.appendChild(deleteButton);

    listItem.appendChild(taskLeft);
    listItem.appendChild(taskActions);

    todoList.appendChild(listItem);
  });

  updateCounter();
  toggleEmptyState(filteredTasks.length);
}

// ========== TOGGLE TASK ==========
function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

// ========== DELETE TASK ==========
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// ========== UPDATE COUNTER ==========
function updateCounter() {
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  taskCounter.textContent =
    remainingTasks === 1 ? '1 task remaining' : `${remainingTasks} tasks remaining`;
}

// ========== EMPTY STATE ==========
function toggleEmptyState(visibleTasksCount) {
  if (tasks.length === 0 || visibleTasksCount === 0) {
    emptyState.classList.add('show');
  } else {
    emptyState.classList.remove('show');
  }

  if (tasks.length === 0) {
    emptyState.querySelector('h2').textContent = 'No tasks yet';
    emptyState.querySelector('p').textContent = 'Add your first task to get started.';
  } else if (visibleTasksCount === 0) {
    emptyState.querySelector('h2').textContent = 'No matching tasks';
    emptyState.querySelector('p').textContent = 'Try switching the filter to view other tasks.';
  }
}

// ========== INIT ==========
body.className = 'dark-mode';
renderTasks();
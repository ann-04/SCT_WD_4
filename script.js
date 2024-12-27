const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskDateTime = document.getElementById('task-datetime');
const todoList = document.getElementById('todo-list');

// Handle form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = taskInput.value.trim();
    const dateTime = taskDateTime.value;

    if (task) {
        addTask(task, dateTime);
        taskInput.value = '';
        taskDateTime.value = '';
    }
});

// Add a new task to the list
function addTask(task, dateTime) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskDetails = document.createElement('span');
    taskDetails.textContent = `${task}${dateTime ? ` (Due: ${formatDateTime(dateTime)})` : ''}`;
    listItem.appendChild(taskDetails);

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const completeBtn = createActionButton('Complete', 'complete-btn', () => {
        listItem.classList.toggle('completed');
    });

    const editBtn = createActionButton('Edit', 'edit-btn', () => {
        const newTask = prompt('Edit Task:', task);
        const newDateTime = prompt('Edit Due Date and Time (yyyy-MM-ddTHH:mm):', dateTime);

        if (newTask) {
            taskDetails.textContent = `${newTask}${newDateTime ? ` (Due: ${formatDateTime(newDateTime)})` : ''}`;
        }
    });

    const deleteBtn = createActionButton('Delete', 'delete-btn', () => {
        listItem.remove();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    listItem.appendChild(actions);
    todoList.appendChild(listItem);
}

// Helper function to create action buttons
function createActionButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', onClick);
    return button;
}

// Helper function to format date and time
function formatDateTime(dateTime) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
}

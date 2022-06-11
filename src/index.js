const axios = require('axios');
const taskList = document.querySelector('#task-list');
const state = {};

const renderTasks = () => {
    const html = state.tasks.map(task => {
        return `
            <li>
            ${task.name}
            <button data-id='${task.id}'>X</button>
            <li>
        `;
    }).join('');
    taskList.innerHTML = html
}

const fetchTasks = async() => {
    const response = await axios.get('/api/tasks');
    const data = response.data;
    state.tasks = data;
    renderTasks();
}

fetchTasks();
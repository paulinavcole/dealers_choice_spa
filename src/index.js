const axios = require('axios');
const taskList = document.querySelector('#task-list');
const taskForm = document.querySelector('form');
const input = document.querySelector('input')
const state = {};

//creates ability to check off tasks
const list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

taskForm.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    const name = input.value;
    try {
        await axios.post('/api/tasks', {
            name
        });
        fetchTasks();
        input.value = '';
    }
    catch(ex) {
        console.log(ex.response.data)
    }
})

taskList.addEventListener('click', async(ev) => {
    if(ev.target.tagName === 'BUTTON'){
        const id = ev.target.getAttribute('data-id');
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    }
});

const renderTasks = () => {
    const html = state.tasks.map(task => {
        return `
            <li>
                ${ task.name }
                <button data-id='${task.id}'>REMOVE TASK</button>
            </li>
        `;
    }).join('')
    taskList.innerHTML = html
}

const fetchTasks = async() => {
    const response = await axios.get('/api/tasks');
    const data = response.data;
    state.tasks = data;
    renderTasks();
}

fetchTasks();
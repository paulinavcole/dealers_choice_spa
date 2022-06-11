const axios = require('axios');
const toDoList = document.querySelector('#to-do list');
const state = {};

const renderToDos = () => {
    const html = state.toDo.map(toDo => {
        return `
            <li>
            ${toDo.name}
            <button data-id='${toDo.id}'>X</button>
            <li>
        `;
    }).join('');
    toDoList.innerHTML = html
}

const fetchToDos = async() => {
    const response = await axios.get('/api/todos');
    const data = response.data;
    state.toDo = data;
    renderToDos();
}

fetchToDos();
// declarations

const todoInput = document.getElementById('todo-input');
const todoBtn = document.getElementById('todo-btn');
const todoList = document.getElementById('todo-list');
const todos = document.getElementById('todos');
//addEventListner
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', removeList);
todos.addEventListener('change', filterTodo);
// function
function addTodo(e) {
  //prevent default
  e.preventDefault();
  if (todoInput.value !== '') {
    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //local storage
    saveLocalTodos(todoInput.value);
    //create new listitem
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    newTodo.classList.add('list-item');
    //append tododiv
    todoDiv.appendChild(newTodo);
    // create complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completeBtn.classList.add('complete-btn');
    //append tododiv
    todoDiv.appendChild(completeBtn);
    // create trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn');
    //append tododiv
    todoDiv.appendChild(trashBtn);
    //append todolist
    todoList.appendChild(todoDiv);
    //clear text input box
    todoInput.value = '';
  } else {
    alert('Please Enter Your Todo');
  }
}
function removeList(e) {
  const item = e.target;
  if (item.classList[0] === 'trash-btn') {
    if (confirm('Do You Want to Delete')) {
      const todo = item.parentElement;
      //animation
      todo.classList.add('fall');
      removeLocalTodos(todo);
      todo.addEventListener('transitionend', function () {
        todo.remove();
      });
    }
  }
  // checked
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('checked');
  }
}
//filter
function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
// save local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create new listitem
    const newTodo = document.createElement('li');
    newTodo.textContent = todo;
    newTodo.classList.add('list-item');
    //append tododiv
    todoDiv.appendChild(newTodo);
    // create complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completeBtn.classList.add('complete-btn');
    //append tododiv
    todoDiv.appendChild(completeBtn);
    // create trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn');
    //append tododiv
    todoDiv.appendChild(trashBtn);
    //append todolist
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

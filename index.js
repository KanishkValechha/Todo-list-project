// let com = JSON.parse(localStorage.getItem("completed"));
// localStorage.removeItem("completed");

// Selecting all the value
const todoList = document.querySelector(".todo-list");
const todoAdd = document.querySelector(".addButton");
const inputValue = document.querySelector(".input-box");
const showAll = document.querySelector(".all");
const showCompleted = document.querySelector(".completed-todo");
const showNotCompleted = document.querySelector(".notCompleted");
const completedTodos = document.querySelector(".completed");
const container = document.querySelector(".list-container");

//adding event listeners
document.addEventListener("DOMContentLoaded", getLocal);
todoAdd.addEventListener("click", addTodo);
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo(e);
  }
});
showAll.addEventListener("click", function () {
  const todoss = todoList.childNodes;
  todoss.forEach((todo) => todo.classList.remove("dont"));
  fadeIn();
  // hide none
});
showCompleted.addEventListener("click", function () {
  const todoss = todoList.childNodes;
  todoss.forEach((todo) => {
    todo.classList.add("dont");
    if (todo.classList.contains("completed")) {
      todo.classList.remove("dont");
    }
    // filter completed
  });
  fadeIn();
});
showNotCompleted.addEventListener("click", function () {
  const todoss = todoList.childNodes;
  todoss.forEach((todo) => {
    todo.classList.add("dont");
    if (!todo.classList.contains("completed")) {
      todo.classList.remove("dont");
    }
    // filter completed
  });
  fadeIn();
});

//for completing and deleting
todoList.addEventListener("click", deleteCheck);

//functions for event listener
function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  const todo = document.createElement("li");
  todo.classList.add("todo");
  let todoValue = inputValue.value;
  if (!todoValue) {
    alert("Todo cannot be empty");
    return;
  }
  todo.innerText = todoValue;
  addLocal(todoValue);
  todoDiv.appendChild(todo);
  const completeButtton = document.createElement("button");
  completeButtton.classList.add("complete");
  completeButtton.innerHTML = '<i class="fa-solid fa-check"></i>';
  const trashButtton = document.createElement("button");
  trashButtton.classList.add("trash");
  trashButtton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todoDiv.appendChild(completeButtton);
  todoDiv.appendChild(trashButtton);
  todoList.appendChild(todoDiv);
  inputValue.value = "";
  todoHeight = todo.offsetHeight;
  todoDiv.style.height = `calc(${todoHeight}px + 10px)`;
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "trash") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    removeLocal(todo);
  } else if (item.classList[0] === "complete") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    //adding element to completed array of local storage
    let completed;
    if (localStorage.getItem("completed") === null) {
      completed = [];
    } else {
      completed = JSON.parse(localStorage.getItem("completed"));
    }
    completed.push(todo.innerText);
    localStorage.setItem("completed", JSON.stringify(completed));
  }
}

//adding todos to local storage
function addLocal(todo) {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//getting todos from local storange
function getLocal() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (element) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    const todo = document.createElement("li");
    todo.classList.add("todo");
    todo.innerText = element;
    todoDiv.appendChild(todo);
    const completeButtton = document.createElement("button");
    completeButtton.classList.add("complete");
    completeButtton.innerHTML = '<i class="fa-solid fa-check"></i>';
    const trashButtton = document.createElement("button");
    trashButtton.classList.add("trash");
    trashButtton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(completeButtton);
    todoDiv.appendChild(trashButtton);
    todoList.appendChild(todoDiv);
    inputValue.value = "";
    todoHeight = todo.offsetHeight;
    todoDiv.style.height = `calc(${todoHeight}px + 10px)`;

    //to check if the todos from local storage are completed
    let completed;
    if (localStorage.getItem("completed") === null) {
      completed = [];
    } else {
      completed = JSON.parse(localStorage.getItem("completed"));
    }
    completed.forEach(function (x) {
      if (x === element) {
        todoDiv.classList.toggle("completed");
      }
    });
  });
}

// to delete todo from local storage
function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const item = todo.innerText;
  todos.splice(todos.indexOf(item), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//animation for fade-in container
function fadeIn() {
  container.animate(
    [
      {
        transform: "translateY(100px)",
        opacity: 0,
      },
      {
        transform: "translateY(0)",
        opacity: 1,
      },
    ],
    {
      duration: 500,
      easing: "ease-in",
    }
  );
}

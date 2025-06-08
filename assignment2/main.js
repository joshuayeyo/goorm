import {
  addTodo,
  handleTodoCompletion,
  loadTodos,
  removeTodo,
  saveTodos,
  todos,
} from "./todo.js";

const todosSection = document.getElementById("todos");
const addButton = document.querySelector(".todo-add-button");

const renderTodos = () => {
  todosSection.innerHTML = "";

  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo-item";
    div.tabIndex = 0;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      handleTodoCompletion(index);
      renderTodos();
    });

    let contentElement;

    if (todo.isEditing) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = todo.text || "";
      input.placeholder = "할 일을 입력하세요";
      input.className = "todo-input";

      input.addEventListener("blur", () => {
        todo.text = input.value.trim();
        todo.isEditing = false;
        saveTodos();
        renderTodos();
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          input.blur();
        }
      });
      contentElement = input;
      setTimeout(() => {
        input.focus();
      }, 0);
    } else {
      const span = document.createElement("span");
      span.textContent = todo.text;
      if (todo.completed) {
        span.classList.add("completed");
      }

      contentElement = span;
    }

    const editButton = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.src = "/public/editButton.svg";
    editImg.alt = "편집";
    editImg.style.width = "20px";
    editImg.style.height = "20px";
    editButton.appendChild(editImg);
    editButton.addEventListener("click", () => {
      todo.isEditing = true;
      saveTodos();
      renderTodos();
    });

    const removeButton = document.createElement("button");
    const deleteImg = document.createElement("img");
    deleteImg.src = "/public/deleteButton.svg";
    deleteImg.alt = "삭제";
    deleteImg.style.width = "20px";
    deleteImg.style.height = "20px";
    removeButton.appendChild(deleteImg);
    removeButton.addEventListener("click", () => {
      removeTodo(index);
      renderTodos();
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.style.display = "flex";
    buttonGroup.style.gap = "4px";
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(removeButton);

    div.appendChild(checkbox);
    div.appendChild(contentElement);
    div.appendChild(buttonGroup);

    todosSection.appendChild(div);
  });
};

addButton.addEventListener("click", () => {
  addTodo();
  renderTodos();
});

loadTodos();
renderTodos();

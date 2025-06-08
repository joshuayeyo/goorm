export let todos = [];

export const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  todos = storedTodos
    ? JSON.parse(storedTodos).map((todo) => ({
        text: todo.text,
        completed: todo.completed || false,
        isEditing: todo.isEditing || false,
      }))
    : [];
};

export const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const addTodo = (todo) => {
  todos.unshift({ text: todo, completed: false, isEditing: true });
  saveTodos();
};

export const handleTodoCompletion = (index) => {
  if (index >= 0 && index < todos.length) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
  } else {
    console.error("인덱스가 범위를 벗어났습니다.");
  }
};

export const editTodo = (index, newText) => {
  if (index >= 0 && index < todos.length) {
    todos[index].text = newText;
    saveTodos();
  } else {
    console.error("인덱스가 범위를 벗어났습니다.");
  }
};

export const removeTodo = (index) => {
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    saveTodos();
  } else {
    console.error("인뎃스가 범위를 벗어났습니다.");
  }
};

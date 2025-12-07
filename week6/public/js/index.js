const todoForm = document.getElementById("todoForm");
const userInput = document.getElementById("userInput");
const todoInput = document.getElementById("todoInput");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const messageEl = document.getElementById("message");
const userSection = document.getElementById("userSection");
const userNameEl = document.getElementById("userName");
const todoList = document.getElementById("todoList");
const deleteUserBtn = document.getElementById("deleteUser");

let currentUser = null;

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = userInput.value.trim();
  const todo = todoInput.value.trim();
  if (!name || !todo) return;

  try {
    const res = await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, todo }),
    });
    const data = await res.json();
    messageEl.textContent = data.message;
    todoInput.value = "";
  } catch (err) {
    console.error(err);
  }
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = searchInput.value.trim();
  if (!name) return;

  try {
    const res = await fetch(`/todos/${encodeURIComponent(name)}`);
    const data = await res.json();

    if (res.ok) {
      currentUser = data;
      userNameEl.textContent = currentUser.name;
      renderTodos(currentUser);
      userSection.style.display = "block";
      messageEl.textContent = "";
    } else {
      userSection.style.display = "none";
      messageEl.textContent = data.message;
    }
  } catch (err) {
    console.error(err);
  }
});

deleteUserBtn.addEventListener("click", async () => {
  if (!currentUser) return;

  try {
    const res = await fetch("/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: currentUser.name }),
    });
    const data = await res.json();
    messageEl.textContent = data.message;
    userSection.style.display = "none";
    currentUser = null;
  } catch (err) {
    console.error(err);
  }
});

function renderTodos(user) {
  todoList.innerHTML = "";

  if (!user.todos || !user.todos.length) {
    todoList.innerHTML = "<li>No todos found for this user</li>";
    return;
  }

  user.todos.forEach((t) => {
    const li = document.createElement("li");
    li.style.listStyle = "none";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.checked;
    checkbox.style.marginRight = "8px";

    const span = document.createElement("span");
    span.textContent = t.todo;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Todo";
    deleteBtn.style.marginLeft = "10px";

    checkbox.addEventListener("change", async () => {
      try {
        const res = await fetch("/updateTodo", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            todo: t.todo,
            checked: checkbox.checked,
          }),
        });
        const data = await res.json();
        messageEl.textContent = data.message;
      } catch (err) {
        console.error(err);
        messageEl.textContent = "Error updating todo.";
      }
    });

    deleteBtn.addEventListener("click", async () => {
      try {
        const res = await fetch("/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: user.name, todo: t.todo }),
        });
        const data = await res.json();
        messageEl.textContent = data.message;
        li.remove();
      } catch (err) {
        console.error(err);
        messageEl.textContent = "Error deleting todo.";
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}
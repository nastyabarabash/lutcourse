document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const loginLi = document.getElementById("login-li");
  const logoutLi = document.getElementById("logout-li");

  if (token) {
    loginLi.style.display = "none";
    logoutLi.style.display = "block";
  } else {
    loginLi.style.display = "block";
    logoutLi.style.display = "none";
  }

  document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    location.reload();
  });

  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });

  if (token) setupTopicForm(token);

  loadTopics(token);
});

function setupTopicForm(token) {
  const topicFormDiv = document.getElementById("topicForm");
  const form = document.createElement("form");

  form.innerHTML = `
    <div class="input-field">
      <input id="topicTitle" type="text" required />
      <label for="topicTitle">Title</label>
    </div>

    <div class="input-field">
      <textarea id="topicText" class="materialize-textarea" required></textarea>
      <label for="topicText">Content</label>
    </div>

    <button id="postTopic" type="submit" class="btn waves-effect waves-light">
      Post topic
    </button>
  `;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("/api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.topicTitle.value,
        content: form.topicText.value,
      }),
    });

    form.reset();
    loadTopics(token);
  });

  topicFormDiv.appendChild(form);
}

async function loadTopics(token) {
  const res = await fetch("/api/topics");
  const topics = await res.json();

  const container = document.getElementById("topics");
  container.innerHTML = "";

  topics.forEach((topic) => {
    const card = document.createElement("div");
    card.className = "card z-depth-2 hoverable grey lighten-2";

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("span");
    title.className = "card-title";
    title.textContent = topic.title;

    const text = document.createElement("p");
    text.textContent = topic.content;

    const meta = document.createElement("p");
    meta.className = "grey-text text-darken-2";
    meta.textContent = `${topic.username} – ${new Date(topic.createdAt).toLocaleString()}`;

    content.append(title, text, meta);

    const actions = document.createElement("div");
    actions.className = "card-action";

    if (token) {
      const delBtn = document.createElement("button");
      delBtn.className = "btn waves-effect waves-light";
      delBtn.textContent = "Delete";

      delBtn.addEventListener("click", async () => {
        const res = await fetch(`/api/topic/${topic._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) alert(data.message || "Access denied");
        loadTopics(token);
      });

      actions.appendChild(delBtn);
    }

    card.append(content, actions);
    container.appendChild(card);
  });
}
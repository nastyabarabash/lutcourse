document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data.error)
    return
  }

  localStorage.setItem("token", data.token)
  location.reload()
})

async function loadTopics() {
  const res = await fetch("/api/topics")
  const topics = await res.json()

  const container = document.getElementById("topics")
  container.innerHTML = ""

  topics.forEach(topic => {
    const card = document.createElement("div")
    card.className = "card z-depth-2 hoverable grey lighten-2"

    const content = document.createElement("div")
    content.className = "card-content"

    const title = document.createElement("span")
    title.className = "card-title"
    title.textContent = topic.title

    const text = document.createElement("p")
    text.textContent = topic.content

    const meta = document.createElement("p")
    meta.className = "grey-text text-darken-2"
    meta.textContent = `${topic.username} – ${new Date(topic.createdAt).toLocaleString()}`

    content.append(title, text, meta)

    const actions = document.createElement("div")
    actions.className = "card-action"

    const delBtn = document.createElement("button")
    delBtn.id = "deleteTopic"
    delBtn.className = "btn waves-effect waves-light"
    delBtn.textContent = "Delete"

    delBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token")

      const res = await fetch(`/api/topic/${topic._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.message)
      } else {
        loadTopics()
      }
    })

    actions.appendChild(delBtn)
    card.append(content, actions)
    container.appendChild(card)
  })
}

function setupTopicForm() {
  const token = localStorage.getItem("token")
  if (!token) return

  const topicFormDiv = document.getElementById("topicForm")
  const form = document.createElement("form")

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
  `

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    await fetch("/api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: form.topicTitle.value,
        content: form.topicText.value
      })
    })

    form.reset()
    loadTopics()
  })

  topicFormDiv.appendChild(form)
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token")
  const navbarRight = document.getElementById("navbar-right")

  if (token) {
    navbarRight.innerHTML = `
      <button id="logout" class="btn waves-effect waves-light">Logout</button>
    `

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("token")
      location.reload()
    })
  } else {
    const loginForm = document.getElementById("loginForm")
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.error)
        return
      }

      localStorage.setItem("token", data.token)
      location.reload()
    })
  }

  loadTopics()
  setupTopicForm()
})
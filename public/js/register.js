const initializeRegister = () => {
  document.getElementById("registerForm").addEventListener("submit", (event) => {
    fetchData(event)
  })
}

const fetchData = async (event) => {
  event.preventDefault()

  const formData = {
    email: event.target.email.value,
    username: event.target.username.value,
    password: event.target.password.value,
  }

  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    
    if (!response.ok) {
      const data = await response.json();
    
      if (data.errors && Array.isArray(data.errors)) {
        // show all validation errors
        document.getElementById("error").innerHTML =
          data.errors.map(err => `• ${err.msg}`).join("<br>");
      } else if (data.error) {
        document.getElementById("error").innerText = data.error;
      } else {
        document.getElementById("error").innerText =
          "Error when trying to register.";
      }
    
      return;
    } else {
      window.location.href = "login.html"
    }
  } catch (error) {
    console.log(`Error while trying to register: ${error.message}`)
  }
}

initializeRegister()
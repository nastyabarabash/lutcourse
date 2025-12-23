const initializeLogin = () => {
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    fetchData(event)
  })
}

const fetchData = async (event) => {
  event.preventDefault();

  const formData = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      document.getElementById("error").innerText = data.error || "Error when trying to login. Please try again later";
      return;
    }

    if (data.token) {
      localStorage.setItem("auth_token", data.token);
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(`Error while trying to login: ${error.message}`);
  }
};

initializeLogin()
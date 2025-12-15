const form = document.getElementById("offerForm");
const offersContainer = document.getElementById("offersContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      form.reset();
    } else {
      console.error("Error submitting offer:", data.message);
    }
  } catch (err) {
    console.error("Error submitting offer:", err);
  }
});

async function loadOffers() {
  try {
    const res = await fetch("/offers");
    const offers = await res.json();
    console.log("Loaded offers:", offers);
  } catch (err) {
    console.error("Error loading offers:", err);
  }
}

const listOfUsers = async () => {
  const response = await fetch("/list", {
    method: "GET",
    headers: {}
  })

  if (!response.ok) {
    document.getElementById("error").textContent = "Error while fetching users."
  } else {
    const data = await response.json()
    let users = ''
    data.map(user => {
      users += `<li>Email ${user.email}, ID: ${user._id}</li>`
    })
    document.getElementById("user-list").innerHTML = users
  }
}


window.addEventListener("DOMContentLoaded", () => {
  listOfUsers()
  loadOffers()
})
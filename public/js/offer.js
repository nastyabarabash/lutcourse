const form = document.getElementById("offerForm");
const offersContainer = document.getElementById("offersContainer");

function renderOffers(offers) {
  offersContainer.innerHTML = "";

  offers.forEach(offer => {
    const div = document.createElement("div");
    div.className = "offerDiv col s12 m6 l4";

    div.innerHTML = `
      <img src="${offer.imagePath || '/images/puzzle.jpg'}" class="responsive-img" />
      <p><strong>${offer.title}</strong></p>
      <p>${offer.description}</p>
      <p>Price: €${offer.price}</p>
    `;

    offersContainer.appendChild(div);
  });
}

async function loadOffers() {
  try {
    const res = await fetch("/offers");
    const offers = await res.json();
    renderOffers(offers);
  } catch (err) {
    console.error("Error loading offers:", err);
  }
}

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
      loadOffers();
    } else {
      console.error("Error submitting offer:", data.message);
    }
  } catch (err) {
    console.error("Error submitting offer:", err);
  }
});

window.addEventListener("DOMContentLoaded", loadOffers);

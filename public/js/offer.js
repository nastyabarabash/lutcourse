const form = document.getElementById("offerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    msg.textContent = data.message;
    form.reset();
  } catch (err) {
    console.error(err);
    msg.textContent = "Error submitting offer.";
  }
});
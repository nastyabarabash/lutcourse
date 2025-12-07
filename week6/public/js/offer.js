const form = document.getElementById("offerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = Number(document.getElementById("price").value);
  const description = document.getElementById("description").value.trim();

  if (!title || !price || !description) {
    msg.textContent = "All fields except image are required.";
    return;
  }

  try {
    const res = await fetch("/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, description })
    });

    const data = await res.json();
    msg.textContent = data.message;
    form.reset();

  } catch (err) {
    console.error(err);
    msg.textContent = "Error submitting offer.";
  }
});

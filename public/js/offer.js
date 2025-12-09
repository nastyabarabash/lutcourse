const form = document.getElementById("offerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    form.reset();
  } catch (err) {
    console.error(err);
  }
});
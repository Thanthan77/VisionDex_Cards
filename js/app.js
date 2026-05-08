document.getElementById("generate").addEventListener("click", async () => {
  const text = document.getElementById("description").value.trim();
  if (text === "") {
    alert("Écris une description avant de générer !");
    return;
  }

  // URL de ton Worker Cloudflare
  const WORKER_URL = "https://orange-forest-580d.ethanqc-chea.workers.dev";

  // Appel au Worker Cloudflare
  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: text,
    }),
  });

  let cardData;
  try {
    cardData = await response.json();
  } catch (e) {
    console.error("Erreur JSON du Worker :", e);
    alert("Erreur : le Worker n'a pas renvoyé un JSON valide.");
    return;
  }

  // Encodage JSON → URL
  const encoded = encodeURIComponent(JSON.stringify(cardData));

  // Redirection vers la page carte
  window.location.href = "carte.html?data=" + encoded;
});

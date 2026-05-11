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

  // Encodage JSON vers URL
  const encoded = encodeURIComponent(JSON.stringify(cardData));

  // Redirection vers la page carte
  window.location.href = "assets/carte.html?data=" + encoded;
});

document.getElementById("random-card").addEventListener("click", async () => {
  const DESC_WORKER = "https://late-flower-c74a.ethanqc-chea.workers.dev";
  const CARD_WORKER = "https://orange-forest-580d.ethanqc-chea.workers.dev";

  //Générer une description aléatoire
  const descRes = await fetch(DESC_WORKER);
  const { description } = await descRes.json();

  //Générer la carte complète
  const cardRes = await fetch(CARD_WORKER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  const cardData = await cardRes.json();

  //Redirection vers carte.html
  const encoded = encodeURIComponent(JSON.stringify(cardData));
  window.location.href = "assets/carte.html?data=" + encoded;
});

document.getElementById("open-collection").onclick = () => {
  window.location.href = "../pages/galerie_carte.html";
};

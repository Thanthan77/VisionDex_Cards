// Données de la carte (exemple)
const cardData = {
  title: "Crayon Papier Deluxe",
  rarity: "Rare",
  emoji: "📝",
  type: "Objet / Outil",
  attributes: ["wooden", "yellow", "sharp", "lightweight"],
  description:
    "Un crayon en bois de haute qualité, utilisé pour écrire, dessiner et esquisser avec précision.",
  color: "#1e88e5", // couleur du contour + badge
};

// Fonction qui remplit la carte
function remplirCarte(data) {
  document.getElementById("card-title").textContent = data.title;
  document.getElementById("card-rarity").textContent = data.rarity;
  document.getElementById("card-emoji").textContent = data.emoji;
  document.getElementById("card-type").textContent = data.type;
  document.getElementById("card-attributes").textContent =
    data.attributes.join(", ");
  document.getElementById("card-description").textContent = data.description;

  changerCouleurRareté(data.color);
}

// Fonction pour changer la couleur du contour + badge
function changerCouleurRareté(couleur) {
  const card = document.querySelector(".card");

  // On applique directement les couleurs utilisées par le nouveau CSS
  card.style.setProperty("--color", couleur);
  card.style.setProperty("--glow", couleur + "55");
}

// Exécution
remplirCarte(cardData);

// Capture simple (plus besoin de modifier les styles)
document.getElementById("add-to-dex").addEventListener("click", () => {
  const card = document.querySelector(".card");

  html2canvas(card, { scale: 1 }).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    sauvegarderDansDex(imageData);
    showToastThenRedirect();
  });
});

function sauvegarderDansDex(imageData) {
  let dex = JSON.parse(localStorage.getItem("visiondex")) || [];

  dex.push({
    title: cardData.title,
    rarity: cardData.rarity,
    image: imageData,
  });

  localStorage.setItem("visiondex", JSON.stringify(dex));
}

function showToastThenRedirect() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  // Attendre 1.2 seconde puis rediriger
  setTimeout(() => {
    toast.classList.remove("show");
    window.location.href = "/pages/galerie_carte.html"; // adapte le chemin
  }, 1200);
}

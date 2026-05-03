// Données de la carte (exemple)
const cardData = {
  title: "Crayon Papier Deluxe",
  rarity: "Rare",
  emoji: "📝",
  type: "Objet / Outil",
  attributes: ["wooden", "yellow", "sharp", "lightweight"],
  description:
    "Un crayon en bois de haute qualité, utilisé pour écrire, dessiner et esquisser avec précision.",
  color: "#007bff", // couleur du contour + badge
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

  card.style.setProperty("--rarity-color", couleur);
  card.style.setProperty("--rarity-glow", couleur + "55");
}

// Exécution
remplirCarte(cardData);

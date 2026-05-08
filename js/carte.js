// Récupérer les données encodées dans l'URL
const params = new URLSearchParams(window.location.search);
const encodedData = params.get("data");

//  Si aucune donnée alors fallback vers un exemple
let cardData;

if (encodedData) {
  try {
    cardData = JSON.parse(decodeURIComponent(encodedData));
  } catch (e) {
    console.error("Erreur de décodage JSON :", e);
  }
}

//  Si rien dans l'URL alors utiliser un exemple (sécurité)
if (!cardData) {
  cardData = {
    title: "Crayon Papier Deluxe",
    rarity: "Rare",
    emoji: "📝",
    type: "Objet / Outil",
    attributes: ["wooden", "yellow", "sharp", "lightweight"],
    description:
      "Un crayon en bois de haute qualité, utilisé pour écrire, dessiner et esquisser avec précision.",
    color: "#1e88e5",
  };
}

//  Fonction qui remplit la carte
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

// Couleur selon rareté
function changerCouleurRareté(couleur) {
  const card = document.querySelector(".card");
  card.style.setProperty("--color", couleur);
  card.style.setProperty("--glow", couleur + "55");
}

//  Génération automatique de la carte
remplirCarte(cardData);

//  Capture et sauvegarde
document.getElementById("add-to-dex").addEventListener("click", () => {
  const card = document.querySelector(".card");

  html2canvas(card, { scale: 1 }).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    sauvegarderDansDex(imageData);
    showToastThenRedirect();
  });
});

// Sauvegarde dans VisionDex
function sauvegarderDansDex(imageData) {
  let dex = JSON.parse(localStorage.getItem("visiondex")) || [];

  dex.push({
    title: cardData.title,
    rarity: cardData.rarity,
    type: cardData.type,
    description: cardData.description,
    attributes: cardData.attributes,
    image: imageData,
  });

  localStorage.setItem("visiondex", JSON.stringify(dex));
}

//  Toast et redirection
function showToastThenRedirect() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    window.location.href = "/pages/galerie_carte.html";
  }, 1200);
}

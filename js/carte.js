// Récupérer les données encodées dans l'URL
const params = new URLSearchParams(window.location.search);
const encodedData = params.get("data");

let cardData;

if (encodedData) {
  try {
    cardData = JSON.parse(decodeURIComponent(encodedData));
    console.log("📦 Données chargées:", cardData);
  } catch (e) {
    console.error("Erreur de décodage JSON :", e);
  }
}

// Fallback avec emoji
if (!cardData) {
  cardData = {
    title: "Larme de Fée",
    rarity: "Rare",
    emoji: "🧚",
    type: "Potion",
    attributes: ["Magique", "Scintillant"],
    description: "Une goutte scintillante tombée d'une aile de fée.",
    color: "#e91e63",
  };
}

// Fonction qui remplit la carte 
function remplirCarte(data) {
  document.getElementById("card-title").textContent = data.title;
  document.getElementById("card-rarity").textContent = data.rarity;
  document.getElementById("card-type").textContent = data.type;

  // Gestion attributs
  const attrsElement = document.getElementById("card-attributes");
  if (attrsElement) {
    if (data.attributes && Array.isArray(data.attributes)) {
      attrsElement.textContent = data.attributes.join(", ");
    } else {
      attrsElement.textContent = data.attributes || "Aucun";
    }
  }

  document.getElementById("card-description").textContent = data.description;

  // 🖼️ GESTION INTELLIGENTE DE L'IMAGE/EMOJI
  const imageElement = document.getElementById("card-image");
  const emojiElement = document.getElementById("card-emoji");

  // Priorité à l'emoji
  const emojiValue =
    data.emoji ||
    data.image_emoji ||
    (data.image && data.image.length < 10 ? data.image : null) ||
    "✨";

  if (emojiElement) {
    // Structure avec élément emoji dédié
    emojiElement.textContent = emojiValue;
    emojiElement.style.fontSize = "100px";
    emojiElement.style.display = "flex";
    emojiElement.style.alignItems = "center";
    emojiElement.style.justifyContent = "center";
  } else if (imageElement) {
    if (emojiValue && emojiValue.length <= 4) {
      // C'est un emoji, on le transforme en texte
      imageElement.style.display = "flex";
      imageElement.style.alignItems = "center";
      imageElement.style.justifyContent = "center";
      imageElement.style.fontSize = "80px";
      imageElement.style.background =
        "linear-gradient(135deg, #1a1a2e, #16213e)";
      imageElement.style.borderRadius = "50%";
      imageElement.style.width = "160px";
      imageElement.style.height = "160px";
      imageElement.style.margin = "0 auto";
      imageElement.textContent = emojiValue;
      imageElement.alt = "";
    } else if (data.image && data.image.startsWith("http")) {
      // C'est une vraie URL d'image
      imageElement.src = data.image;
      imageElement.alt = data.title;
    } else {
      // Fallback
      imageElement.textContent = "✨";
    }
  }

  changerCouleurRareté(data.color);
}

// Couleur selon rareté
function changerCouleurRareté(couleur) {
  const card = document.querySelector(".card");
  if (couleur) {
    card.style.setProperty("--color", couleur);
    card.style.setProperty("--glow", couleur + "55");
  } else {
    // Couleurs par défaut selon rareté
    const rarityColors = {
      Commun: "#9e9e9e",
      "Peu commun": "#4caf50",
      Rare: "#2196f3",
      Épique: "#9c27b0",
      Légendaire: "#ff9800",
      Mystique: "#e91e63",
    };
    const color = rarityColors[cardData.rarity] || "#9e9e9e";
    card.style.setProperty("--color", color);
    card.style.setProperty("--glow", color + "55");
  }
}

// Génération automatique
remplirCarte(cardData);

// Capture et sauvegarde
document.getElementById("add-to-dex").addEventListener("click", () => {
  const card = document.querySelector(".card");
  const btn = document.getElementById("add-to-dex");
  const originalText = btn.textContent;

  btn.textContent = "⏳ Capture...";
  btn.disabled = true;

  html2canvas(card, {
    scale: 2,
    backgroundColor: null,
    logging: false,
  })
    .then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      sauvegarderDansDex(imageData);
      showToastThenRedirect();
    })
    .catch((error) => {
      console.error("Erreur de capture:", error);
      btn.textContent = originalText;
      btn.disabled = false;
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
    emoji: cardData.emoji || cardData.image,
    image: imageData,
    dateSaved: new Date().toISOString(),
  });

  localStorage.setItem("visiondex", JSON.stringify(dex));
  console.log("✅ Carte ajoutée à la galerie");
}

// Toast et redirection
function showToastThenRedirect() {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      window.location.href = "../pages/galerie_carte.html";
    }, 1200);
  } else {
    setTimeout(() => {
      window.location.href = "../pages/galerie_carte.html";
    }, 800);
  }
}

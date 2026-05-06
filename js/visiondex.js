const gallery = document.getElementById("gallery");
const search = document.getElementById("search");
const filterRarity = document.getElementById("filter-rarity");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

let dex = JSON.parse(localStorage.getItem("visiondex")) || [];

function afficherDex() {
  gallery.innerHTML = "";

  let filtered = dex;

  // Recherche
  if (search.value.trim() !== "") {
    filtered = filtered.filter((card) =>
      card.title.toLowerCase().includes(search.value.toLowerCase()),
    );
  }

  // Filtre rareté
  if (filterRarity.value !== "") {
    filtered = filtered.filter((card) => card.rarity === filterRarity.value);
  }

  // Affichage
  filtered.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.image; // image PNG base64
    img.onclick = () => ouvrirModal(card.image);
    gallery.appendChild(img);
  });

  document.getElementById("dex-count").textContent =
    filtered.length + " cartes enregistrées";
}

function ouvrirModal(src) {
  modalImg.src = src;
  modal.classList.remove("hidden");
}

modal.onclick = () => modal.classList.add("hidden");

search.oninput = afficherDex;
filterRarity.onchange = afficherDex;

afficherDex();

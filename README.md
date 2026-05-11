# VisionDex  
VisionDex est une application web permettant de **générer automatiquement des cartes visuelles** à partir d’une simple description textuelle. L’interface est minimaliste, moderne et centrée sur l’utilisateur, offrant une expérience fluide pour créer, afficher et gérer une collection de cartes générées.

## Aperçu du projet  
VisionDex repose sur un **frontend HTML/CSS/JavaScript** simple et efficace.  
L’utilisateur peut :

- saisir une description pour générer une carte,  
- générer une carte aléatoire,  
- consulter sa collection via une modale élégante,  
- stocker ses cartes localement.

Le tout est présenté dans une interface épurée, responsive et agréable à utiliser.

---

## Fonctionnalités principales  

### 🔹 Fonctionnalités du MVP  
- **Génération de cartes VisionDex** à partir d’un prompt textuel.  
- **Génération aléatoire** pour créer une carte surprise.  
- **Collection intégrée** (LocalStorage) pour sauvegarder les cartes générées.  
- **Modale de collection** avec affichage clair et bouton de fermeture.  
- **Validation du champ texte** (pattern + longueur max).  
- **Interface responsive**, adaptée mobile et desktop.  

### 🔹 Fonctionnalités techniques  
- Gestion de la modale (ouverture, fermeture, clic extérieur).  
- Vérification des caractères autorisés dans le champ de saisie.  
- Architecture simple, propre et évolutive.  
- Code organisé pour faciliter l’ajout futur de fonctionnalités (export, filtres, tags, etc.).

---

## Technologies utilisées

| Catégorie        | Technologies |
|------------------|--------------|
| **Frontend**     | HTML, CSS, JavaScript |
| **Stockage**     | LocalStorage |
| **Outils**       | Git, GitHub, Markdown |

---

## Structure du projet
``` plain text
visiondex/
│
├── index.html
├── pages/
│    └── galeries.html
├── js/
│    └── app.js
│    └── carte.js
│    └── visiondex.js
├── css/
│    └── carte.css
│    └── galerie.css
│    └── index.css
├── assets/
│    └── carte.html
│  
│
└── README.md
```

## 🔗 Liens importants

| Type               | Lien                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Site déployé**   | [https://thanthan77.github.io/VisionDex_Cards/](https://thanthan77.github.io/VisionDex_Cards/)  |
| **Repository GitHub** | [https://github.com/Thanthan77/VisionDex_Cards](https://github.com/Thanthan77/VisionDex_Cards) |

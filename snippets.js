// Selecteert de HTML-elementen waar we tekst en keuzes tonen
const $text = document.querySelector("#text");
const $options = document.querySelector("#options");

// Houdt alle scènes van het spel bij
const gameData = {
  entrance: {
    text: "Je staat voor de ingang van een grot, wat zal je doen?",
    options: [
      {
        text: "Ga naar binnen",
        next: "hallway",
      },
      {
        text: "Keer terug om",
        next: "escape",
      },
    ],
  },

  hallway: {
    text: "Je ziet 2 deuren voor je, welke kies je?",
    options: [
      {
        text: "Linker deur",
        next: "monster",
      },
      {
        text: "Rechter deur",
        next: "treasure",
      },
    ],
  },

  monster: {
    text: "Er zat een groot monster achter de linker deur... Game over.",
    options: [
      {
        text: "Opnieuw proberen",
        next: "entrance",
      },
    ],
  },

  treasure: {
    text: "Er zat een grote schat achter de rechter deur. Je hebt gewonnen!",
    options: [
      {
        text: "Opnieuw proberen",
        next: "entrance",
      },
    ],
  },

  escape: {
    text: "Je bent teruggekeerd en hebt geen schatten gevonden.",
    options: [
      {
        text: "Opnieuw proberen",
        next: "entrance",
      },
    ],
  },
};

// Deze functie toont voor iedere scène de juiste tekst en bijhorende keuzes
function startGame(sceneKey) {
  const scene = gameData[sceneKey];

  // Toon de tekst van de huidige scène
  $text.innerHTML = scene.text;

  let html = "";

  // Maak voor elke optie een knop
  scene.options.forEach((option) => {
    html += `<button data-next="${option.next}">${option.text}</button>`;
  });

  // Plaats de knoppen in de HTML
  $options.innerHTML = html;

  // Selecteert alle nieuw aangemaakte knoppen
  const buttons = document.querySelectorAll("button");

  // Voegt klikgedrag toe aan de knoppen om de navigeren naar een andere scene
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      startGame(button.dataset.next);
    });
  });
}

// Start het spel bij de eerste scene
startGame("entrance");

const $text = document.querySelector("#text");
const $options = document.querySelector("#options");
let gameState = "entrance";

const gameData = {
  entrance: {
    text: "Je staat voor de ingang van de grot, wat zal je doen?",
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

function startGame(sceneKey) {
  const scene = gameData[sceneKey];
  gameState = sceneKey;

  $text.innerHTML = scene.text;
  let html = "";

  scene.options.forEach((option) => {
    html += `<button data-next="${option.next}">${option.text}</button>`;
  });

  $options.innerHTML = html;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      startGame(button.dataset.next);
    });
  });
}

startGame(gameState);

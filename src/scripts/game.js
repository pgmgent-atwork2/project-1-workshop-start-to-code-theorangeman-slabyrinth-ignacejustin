const $text = document.querySelector("#text");
const $options = document.querySelector("#options");
let gameState = "entrance";

const gameData = {
  entrance: {
    text: "Je besluit het eiland te verkennen. In het zand zie je de voetsporen van eerdere strijders die het beest probeerden te verslaan.",
    options: [
      { text: "Ga verder", next: "keyChoice" },
      { text: "Keer terug", next: "escapeEnding" },
    ],
  },

  keyChoice: {
    text: "Half begraven in het zand zie je iets glimmen. Het blijkt een oude, roestige sleutel te zijn.",
    options: [
      { text: "Neem de sleutel mee", next: "labyrinthEntrance_key" },
      { text: "Laat de sleutel liggen", next: "labyrinthEntrance_noKey" },
    ],
  },

  labyrinthEntrance_key: {
    text: "Je staat voor de ingang van het labyrint. De stenen poort torent boven je uit. In de verte hoor je een laag gegrom, alsof iets binnenin je aanwezigheid al heeft opgemerkt. Wanneer je dichterbij komt, opent de poort zich langzaam.",
    options: [
      { text: "Betreed het labyrint", next: "hallway_key" },
      { text: "Keer terug", next: "escapeEnding" },
    ],
  },

  labyrinthEntrance_noKey: {
    text: "Je staat voor de ingang van het labyrint. De stenen poort torent boven je uit. In de verte hoor je een laag gegrom, alsof iets binnenin je aanwezigheid al heeft opgemerkt. Wanneer je dichterbij komt, opent de poort zich langzaam.",
    options: [
      { text: "Betreed het labyrint", next: "hallway_noKey" },
      { text: "Keer terug", next: "escapeEnding" },
    ],
  },

  hallway_key: {
    text: "Je stapt het labyrint binnen en achter je sluit de poort zich langzaam. Overal liggen de restanten van gevallen strijders. Voor je splitst de gang zich in twee richtingen.",
    options: [
      { text: "Ga naar de East Wing", next: "eastWing_key" },
      { text: "Ga naar de West Wing", next: "westWing_key" },
    ],
  },

  hallway_noKey: {
    text: "Je stapt het labyrint binnen en achter je sluit de poort zich langzaam. Overal liggen de restanten van gevallen strijders. Voor je splitst de gang zich in twee richtingen.",
    options: [
      { text: "Ga naar de East Wing", next: "eastWing_noKey" },
      { text: "Ga naar de West Wing", next: "westWing_noKey" },
    ],
  },

  westWing_key: {
    text: "Je betreedt de West Wing en wordt omringd door de geesten van gevallen strijders. In stilte wijzen ze je de weg naar de Ballroom.",
    options: [
      { text: "Volg de geesten", next: "ballroom_key" },
      { text: "Ga terug", next: "hallway_key" },
    ],
  },

  westWing_noKey: {
    text: "Je betreedt de West Wing en wordt omringd door de geesten van gevallen strijders. In stilte wijzen ze je de weg naar de Ballroom.",
    options: [
      { text: "Volg de geesten", next: "ballroom_noKey" },
      { text: "Ga terug", next: "hallway_noKey" },
    ],
  },

  eastWing_key: {
    text: "Je betreedt de East Wing. Overal zie je de overblijfselen van mensen die probeerden te ontsnappen. Voor je strekt zich een donkere gang uit.",
    options: [
      { text: "Ga verder", next: "lostEnding" },
      { text: "Ga terug", next: "hallway_key" },
    ],
  },

  eastWing_noKey: {
    text: "Je betreedt de East Wing. Overal zie je de overblijfselen van mensen die probeerden te ontsnappen. Voor je strekt zich een donkere gang uit.",
    options: [
      { text: "Ga verder", next: "lostEnding" },
      { text: "Ga terug", next: "hallway_noKey" },
    ],
  },

  ballroom_key: {
    text: "Je bereikt de Ballroom. Met de sleutel open je de zware deuren en stapt naar binnen. In het midden van de zaal ligt een zwaard.",
    options: [
      { text: "Neem het zwaard mee", next: "ovalOffice_sword" },
      { text: "Laat het zwaard liggen", next: "ovalOffice_noSword" },
    ],
  },

  ballroom_noKey: {
    text: "Je bereikt de Ballroom, maar zonder sleutel blijven de deuren gesloten. Er is geen andere weg vooruit.",
    options: [{ text: "Ga terug", next: "lostEnding" }],
  },

  ovalOffice_sword: {
    text: "Je betreedt de Oval Office. Voor je staat de Minotaurus (Trump), die je woest aankijkt.",
    options: [
      { text: "Val aan met het zwaard", next: "goodEnding" },
      { text: "Vlucht", next: "lostEnding" },
    ],
  },

  ovalOffice_noSword: {
    text: "Je betreedt de Oval Office. Voor je staat de Minotaurus (Trump), die je woest aankijkt.",
    options: [
      { text: "Val aan", next: "badEnding" },
      { text: "Vlucht", next: "lostEnding" },
      { text: "Sluit een deal", next: "dealEnding" },
    ],
  },

  escapeEnding: {
    text: "Je keert terug en blijft in leven, maar je hebt je taak niet volbracht.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  lostEnding: {
    text: "Je raakt verdwaald in het labyrint en deelt het lot van de andere strijders.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  badEnding: {
    text: "Je wordt verslagen door de Minotaurus en deelt het lot van de andere strijders.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  goodEnding: {
    text: "Je verslaat de Minotaurus. De goden belonen je voor je moed en doorzettingsvermogen.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  dealEnding: {
    text: "Je streelt het ego van het beest en sluit een deal. Je blijft in leven, maar wordt zijn dienaar.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
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

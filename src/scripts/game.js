const $text = document.querySelector("#text");
const $options = document.querySelector("#options");

const gameData = {
  entrance: {
    text: "Je besluit het eiland te verkennen. In het zand zie je voetsporen van de vorige strijders die het beest probeerden te verslaan.",
    options: [
      { text: "Ga verder", next: "keyChoice" },
      { text: "Keer terug", next: "escapeEnding" },
    ],
  },

  keyChoice: {
    text: "Half begraven in het zand zie je iets glinsteren, het is een roestige sleutel.",
    options: [
      { text: "Neem de sleutel mee", next: "labyrinthEntrance_key" },
      { text: "Laat de sleutel liggen", next: "labyrinthEntrance_noKey" },
    ],
  },

  labyrinthEntrance_key: {
    text: "Voor je verschijnt de ingang van het labyrint. De stenen poort torent boven je uit. In de verte hoor je een diep gegrom, alsof iets binnenin je aanwezigheid al heeft opgemerkt. Wanneer je dichterbij komt, schuift de poort langzaam open.",
    options: [
      { text: "Betreed het labyrint", next: "hallway_key" },
      { text: "Keer terug", next: "escapeEnding" },
    ],
  },

  labyrinthEntrance_noKey: {
    text: "Voor je verschijnt de ingang van het labyrint. De stenen poort torent boven je uit. In de verte hoor je een diep gegrom, alsof iets binnenin je aanwezigheid al heeft opgemerkt. Wanneer je dichterbij komt, schuift de poort langzaam open.",
    options: [
      { text: "Betreed het labyrint", next: "hallway_noKey" },
      { text: "Keer terug", next: "escapeEnding" },
    ],
  },

  hallway_key: {
    text: "Je stapt het labyrint binnen. Achter je sluit de poort langzaam opnieuw. Overal liggen resten van gevallen strijders. De gang splitst zich in twee richtingen.",
    options: [
      { text: "Ga naar de East Wing", next: "eastWing_key" },
      { text: "Ga naar de West Wing", next: "westWing_key" },
    ],
  },

  hallway_noKey: {
    text: "Je stapt het labyrint binnen. Achter je sluit de poort langzaam opnieuw. Overal liggen resten van gevallen strijders. De gang splitst zich in twee richtingen.",
    options: [
      { text: "Ga naar de East Wing", next: "eastWing_noKey" },
      { text: "Ga naar de West Wing", next: "westWing_noKey" },
    ],
  },

  westWing_key: {
    text: "In de West Wing verschijnen de geesten van gevallen strijders. In stilte wijzen ze je de weg naar de Ballroom.",
    options: [
      { text: "Volg de geesten", next: "ballroom_key" },
      { text: "Ga terug", next: "hallway_key" },
    ],
  },

  westWing_noKey: {
    text: "In de West Wing verschijnen de geesten van gevallen strijders. In stilte wijzen ze je de weg naar de Ballroom.",
    options: [
      { text: "Volg de geesten", next: "ballroom_noKey" },
      { text: "Ga terug", next: "hallway_noKey" },
    ],
  },

  eastWing_key: {
    text: "Je betreedt de East Wing. Overal liggen overblijfselen van mensen die probeerden te ontsnappen. Voor je strekt zich een donkere gang uit.",
    options: [
      { text: "Ga verder", next: "lostEnding" },
      { text: "Ga terug", next: "hallway_key" },
    ],
  },

  eastWing_noKey: {
    text: "Je betreedt de East Wing. Overal liggen overblijfselen van mensen die probeerden te ontsnappen. Voor je strekt zich een donkere gang uit.",
    options: [
      { text: "Ga verder", next: "lostEnding" },
      { text: "Ga terug", next: "hallway_noKey" },
    ],
  },

  ballroom_key: {
    text: "Je bereikt de Ballroom. Met de sleutel open je de zware deuren. In het midden van de zaal ligt een zwaard.",
    options: [
      { text: "Neem het zwaard mee", next: "ovalOffice_sword" },
      { text: "Laat het zwaard liggen", next: "ovalOffice_noSword" },
    ],
  },

  ballroom_noKey: {
    text: "Je bereikt de Ballroom, maar zonder sleutel blijven de deuren gesloten. Er is geen weg vooruit.",
    options: [{ text: "Ga terug", next: "lostEnding" }],
  },

  ovalOffice_sword: {
    text: "Je betreedt de Oval Office. Voor je staat de Minotaurus met zijn prachtige gouden lokken. Hij is niet gediend met je bezoek en wordt woedend.",
    options: [
      { text: "Val aan", next: "goodEnding" },
      { text: "Sluit een deal", next: "dealEnding" },
      { text: "Vlucht", next: "lostEnding" },
    ],
  },

  ovalOffice_noSword: {
    text: "Je betreedt de Oval Office. Voor je staat de Minotaurusmet zijn prachtige gouden lokken. Hij is niet gediend met je bezoek en wordt woedend.",
    options: [
      { text: "Val aan", next: "badEnding" },
      { text: "Sluit een deal", next: "dealEnding" },
      { text: "Vlucht", next: "lostEnding" },
    ],
  },

  escapeEnding: {
    text: "Je keert terug en overleeft, maar je missie blijft onvoltooid.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  lostEnding: {
    text: "Je raakt verdwaald in het labyrint en deelt het lot van de andere strijders.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  badEnding: {
    text: "De Minotaurus verslaat je zonder moeite. Je eindigt zoals de anderen voor je. Net voor je sterft, buigt hij zich naar je toe en fluistert: 'Anyone who thinks my story is anywhere near over is sadly mistaken.'",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  goodEnding: {
    text: "Je verslaat de Minotaurus en doorboort zijn hart. Het beest stort neer en blijft roerloos liggen. De goden belonen je voor je moed en doorzettingsvermogen. Je missie is voltooid.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },

  dealEnding: {
    text: "Je streelt het ego van het beest en sluit een deal. Je leeft, maar als zijn dienaar.",
    options: [{ text: "Opnieuw spelen", next: "entrance" }],
  },
};

function startGame(sceneKey) {
  const scene = gameData[sceneKey];

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

startGame("entrance");

/*  TEMPLATE FOR EACH REGION
    id           – must match the <polygon id> in the SVG
    name         – displayed title
    owner        – who rules it
    houses       – array of objects {type, price, available}
    funFacts     – array of strings
    images       – array of urls (optional)
*/
const REGION_DATA = [
  {
    id: "altstadt",
    name: "Altstadt",
    owner: "Free Merchant Guild",
    houses: [
      {type: "Apartment", price: "6 500 g", available: true}
    ],
    funFacts: [
      "No walls – protected by ancient runes instead.",
      "Hosts the biggest cheese festival each spring."
    ]
  },
  {
    id: "frostborne",
    name: "Frostborne",
    owner: "Jarl Sigrun Ice-Eye",
    houses: [],
    funFacts: [
      "Temperature never rises above 0 °C.",
      "Ice-crystal mines produce 80 % of realm’s mana gems."
    ]
  },
  {
    id: "westliche-insel",
    name: "Westliche Insel",
    owner: "Crown (disputed)",
    houses: [
      {type: "Beach cottage", price: "9 000 g", available: true}
    ],
    funFacts: [
      "Pirates occasionally claim sovereignty.",
      "Hidden cove perfect for smugglers."
    ]
  },
  {
    id: "schloss-valor",
    name: "Schloss Valor",
    owner: "King Albrecht IV",
    houses: [],
    funFacts: [
      "Royal treasury guarded by gold golems.",
      "Public tours every Tuesday (free)."
    ]
  },
  {
    id: "mienen",
    name: "Mienen",
    owner: "Dwarven Consortium",
    houses: [
      {type: "Cave dwelling", price: "5 000 g", available: true}
    ],
    funFacts: [
      "Lowest crime rate on the continent.",
      "Beer flows cheaper than water."
    ]
  },
  {
    id: "konigshagen",
    name: "Königshagen",
    owner: "King Albrecht IV",
    houses: [
      {type: "Noble villa", price: "38 000 g", available: true}
    ],
    funFacts: [
      "Capital city since age of heroes.",
      "Griffon rookery open to public on weekends."
    ]
  },
  {
    id: "sud-block",
    name: "Süd-Block",
    owner: "Independent communes",
    houses: [
      {type: "Artist loft", price: "Rent-only 200 g/month", available: true}
    ],
    funFacts: [
      "Street art is legal and taxed.",
      "Home of the floating market every dusk."
    ]
  },
  {
    id: "Grosse Mann Mienen",
    name: "Ostliche Insel",
    owner: "Circle of Magi",
    houses: [],
    funFacts: [
      "Levitates 3 m above sea – no bridges.",
      "Library contains every spell ever cast."
    ]
  },
  {
    id: "neuer-hafen",
    name: "Neuer Hafen",
    owner: "Trade Federation",
    houses: [
      {type: "Warehouse loft", price: "14 000 g", available: true}
    ],
    funFacts: [
      "Imports 40 % of realm’s coffee.",
      "Sea-serpent sightings every full moon."
    ]
  },
  {
    id: "alter-hafen",
    name: "AlterHafen",
    owner: "Old captains’ families",
    houses: [
      {type: "Captains’ cottage", price: "10 500 g", available: false}
    ],
    funFacts: [
      "Ghost ships dock here on foggy nights.",
      "Oldest tavern serves 200-year-old rum."
    ]
  },
];

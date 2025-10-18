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
    owner: "Valorian government",
    houses: [],
    funFacts: [
      "Its the oldest known City which gives it the Name Old-City (In english)",
      "It was rebuild for History and theres a Museum."
    ]
  },
  {
    id: "frostborne",
    name: "Frostborne",
    owner: "Valorian Government",
    houses: [
        {type: "Cabins", price: "3000$", available: true}
    ],
    funFacts: [
      "Founded by King Beeba.",
      "Was founded for workers and more jobs.",
      "Later the wine for the Astari (Valorka) was produced there."
    ]
  },
  {
    id: "westliche-insel",
    name: "Westliche Insel",
    owner: "king Adam",
    houses: [
      {type: "cabins", price: "4000$", available: true}
    ],
    funFacts: [
      "Originally only was nature - forests.",
      "king Adam build his personal Castle there",
      "Has the longest wall in Valoria and is also (gonna be) the safest City",
      "Its still not finished building."
    ]
  },
  {
    id: "schloss-valor",
    name: "Schloss Valor",
    owner: "Valorian Government",
    houses: [],
    funFacts: [
      "oldest known castle in Valoria",
      "is the biggest castle."
    ]
  },
  {
    id: "mienen",
    name: "Mienen",
    owner: "Valorian Government",
    houses: [],
    funFacts: [
      "Only publicly available mines in Valoria.",
      "King Beebas encounter with the ghosts happened there."
    ]
  },
  {
    id: "konigshagen",
    name: "Königshagen",
    owner: "King Adam",
    houses: [],
    funFacts: [
      "Richest City - only royals are allowed to life there.",
      "The Valorian grand Chess hall is supposed to be build there.",
      "King Adams first ever House is there."
    ]
  },
  {
    id: "sud-block",
    name: "Süd-Block",
    owner: "Valoprian Government",
    houses: [],
    funFacts: [
      "For people with a thight budget that want to own land",
      "Only one person is recorded living there."
    ]
  },
  {
    id: "ostliche-insel",
    name: "Grosse Mann Mienen",
    owner: "Dwayne (BMD)",
    houses: [],
    funFacts: [
      "Bought by Dwayne - the biggest investor - to build mines there",
      "was used by scouts to scout on enemys"
    ]
  },
  {
    id: "neuer-hafen",
    name: "Neuer Hafen",
    owner: "Not Sure",
    houses: [],
    funFacts: [
      "Originally build by the Astari",
      "Allows access to Draig on foot."
    ]
  },
  {
    id: "alter-hafen",
    name: "AlterHafen",
    owner: "Old captains’ families",
    houses: [
      {type: "apartements", price: "unknown", available: false}
    ],
    funFacts: [
      "Was rebuild by King MineKid",
      "Is partly autonomous."
    ]
  },
];

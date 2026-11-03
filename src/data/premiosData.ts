export interface AwardFestivalGroup {
  festival: string;
  items: string[];
}

export interface PremiaCase {
  id: number;
  title: string;
  client: string;
  image: string;
  festivals: AwardFestivalGroup[];
}

export interface PremioCounter {
  value: number;
  label: string;
}

export const PREMIOS_COUNTERS: PremioCounter[] = [
  { value: 39, label: 'Cannes Lions' },
  { value: 6, label: 'Clio Awards' },
  { value: 5, label: 'Wave Festival' },
  { value: 12, label: 'Outros Prêmios' },
];

export const PREMIOS_CASES: PremiaCase[] = [
  {
    "id": 1,
    "title": "Desalma",
    "client": "GloboPlay",
    "image": "/images/premios/WhatsApp-Image-2020-10-29-at-20.34.52.jpeg",
    "festivals": [
      {
        "festival": "Muse Awards 2021",
        "items": [
          "Gold (Outdoor Advertising)",
          "Silver (Outdoor Advertising)"
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "Cozinha Às Cegas",
    "client": "Maggi",
    "image": "/images/premios/CozinhaAsCegas_Conjunto.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2021",
        "items": [
          "Bronze (Craft)",
          "Shortlist (Direct)",
          "Shortlist (Design)"
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Acessibility Mat",
    "client": "Ford Brasil",
    "image": "/images/premios/acessibi_MAT_play.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2019",
        "items": [
          "Silver Cannes Lion (MOBILE)",
          "Bronze Cannes Lion (DESIGN)",
          "Bronze Cannes Lion (Brand Experience & Activation)",
          "Bronze Cannes Lion (Sustainable Development Goals)",
          "2 ShortList Cannes Lion (Brand Experience & Activation)",
          "1 ShortList Cannes Lion (Design)",
          "2 ShortList Cannes Lion (Direct)",
          "1 ShortList Cannes Lion (Innovation)",
          "3 ShortList Cannes Lion (Mobile)",
          "1 ShortList Cannes Lion (Sustainable Development Goals)"
        ]
      },
      {
        "festival": "Wave Festival 2019",
        "items": [
          "GrandPrix (Brand Experience & Activation)",
          "Ouro (Design)",
          "Prata (Direct)",
          "Bronze (Mobile)"
        ]
      },
      {
        "festival": "D&AD Awards 2019",
        "items": [
          "Yellow Pencil / Digital Design / Internet of Things"
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "O Algoritmo da Vida",
    "client": "Rolling Stone",
    "image": "/images/premios/AGORTIMO.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2019",
        "items": [
          "Bronze Cannes Lion (Social & Influencers)",
          "ShortList Cannes Lion (Creative Data Lions)"
        ]
      }
    ]
  },
  {
    "id": 5,
    "title": "110 Anos",
    "client": "Johnnie Walker",
    "image": "/images/premios/johnnie-walker.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2019",
        "items": [
          "Bronze Cannes Lion (CRAFT)",
          "ShortList Cannes Lion (Industry Craft)"
        ]
      }
    ]
  },
  {
    "id": 6,
    "title": "Freezer Beerboard",
    "client": "Amstel – Heineken",
    "image": "/images/premios/amstel.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2019",
        "items": [
          "ShortList Cannes Lion (OUTDOOR)",
          "ShortList Cannes Lion (MEDIA)"
        ]
      }
    ]
  },
  {
    "id": 7,
    "title": "A Rota de Emergência",
    "client": "JC Decaux",
    "image": "/images/premios/rota-de-emergencia.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2018",
        "items": [
          "Gold Cannes Lion (OUTDOOR – Dynamic Digital Screens)",
          "Bronze Cannes Lion (OUTDOOR – STANDARD SITES)",
          "Bronze Cannes Lion",
          "Shortlist Cannes Lion",
          "Shortlist Cannes Lion"
        ]
      }
    ]
  },
  {
    "id": 8,
    "title": "Reactive Poster",
    "client": "Nike",
    "image": "/images/premios/nike_reactive3.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2018",
        "items": [
          "Shortlist Cannes Lion"
        ]
      }
    ]
  },
  {
    "id": 9,
    "title": "McCode",
    "client": "McDonald’s",
    "image": "/images/premios/mcode3.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Bronze Cannes Lion",
          "Shortlist Cannes Lion"
        ]
      }
    ]
  },
  {
    "id": 10,
    "title": "Pinlist",
    "client": "Tok&Stok",
    "image": "/images/premios/pin5.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Bronze Cannes Lion (CYBER – BRANDED TECH – TANGIBLE TECH)",
          "Bronze Cannes Lion (CYBER – SOCIAL – SOCIAL BUSINESS",
          "Shortlist Cannes Lions"
        ]
      }
    ]
  },
  {
    "id": 11,
    "title": "Jogadores Invisíveis",
    "client": "ESPNW",
    "image": "/images/premios/espnw2.jpg",
    "festivals": [
      {
        "festival": "Clio Awards 2016",
        "items": [
          "Grand Clio Out of Home | Transit – Media & News",
          "ShortList Clio Events/Experiential | Media & News"
        ]
      }
    ]
  },
  {
    "id": 12,
    "title": "Eye Test",
    "client": "ESPN",
    "image": "/images/premios/eyetest2.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Silver Cannes Lions (CYBER – BRANDED TECH – DIGITAL BILLBOARD)",
          "Shortlist Cannes Lions (OUTDOOR – AMBIENT – DIGITAL SCREENS)"
        ]
      }
    ]
  },
  {
    "id": 13,
    "title": "The Speaking Fireworks",
    "client": "Military with PTSD",
    "image": "/images/premios/PF_04.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Bronze Cannes Lions"
        ]
      }
    ]
  },
  {
    "id": 14,
    "title": "School Zone Radio",
    "client": "Suzuki",
    "image": "/images/premios/school-zone-radio-min.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Silver Cannes Lions (RADIO – USE OF RADIO – USE OF RADIO AS A MEDIUM)"
        ]
      }
    ]
  },
  {
    "id": 15,
    "title": "Radio Finger",
    "client": "Itaipava",
    "image": "/images/premios/finger.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Bronze Cannes Lions (RADIO – MEDIUM – USE OF AUDIO TECHNOLOGY)"
        ]
      }
    ]
  },
  {
    "id": 16,
    "title": "Parking Radio",
    "client": "FMA Brasil Insurance",
    "image": "/images/premios/Parking-Radio.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2016",
        "items": [
          "Silver Cannes Lions (RADIO – MEDIUM – USE OF AUDIO TECHNOLOGY)",
          "Shortlist Cannes Lions (OUTDOOR – AMBIENT – TRANSIT)"
        ]
      }
    ]
  },
  {
    "id": 17,
    "title": "Trip Book",
    "client": "Smiles",
    "image": "/images/premios/tripbookj3.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2015",
        "items": [
          "Shortlist Cannes Lion (MEDIA PRODUCT & SERVICE TRAVEL, ENTERTAINMENT & LEISURE)",
          "Shortlist Cannes Lion (MEDIA – USE OF MEDIA – USE OF BRANDED CONTENT & SPONSORSHIP)"
        ]
      }
    ]
  },
  {
    "id": 18,
    "title": "Ticket Books",
    "client": "L&PM",
    "image": "/images/premios/book3.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2015",
        "items": [
          "Silver Cannes Lions (MEDIA – USE OF MEDIA – USE OF AMBIENT MEDIA: SMALL SCALE)",
          "Silver Cannes Lions (OUTDOOR – AMBIENT SMALL SCALE – SPECIAL SOLUTIONS)",
          "Bronze Cannes Lions (DESIGN – VISUAL LANGUAGE & GRAPHICS – PROMOTIONAL ITEM DESIGN)",
          "Shortlist Cannes Lions"
        ]
      }
    ]
  },
  {
    "id": 19,
    "title": "Unforgettable Shots",
    "client": "Shopping SP Market",
    "image": "/images/premios/unforgettable-shots.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2015",
        "items": [
          "Bronze Cannes Lions (OUTDOOR – AMBIENT – TRANSIT)",
          "Shortlist Cannes Lions (MEDIA – USE OF MEDIA – USE OF AMBIENT MEDIA: SMALL SCALE)",
          "Shortlist Cannes Lions (DESIGN – BRAND ENVIRONMENTS – WAYFINDING & SIGNAGE)"
        ]
      }
    ]
  },
  {
    "id": 20,
    "title": "First Step Project",
    "client": "Kanui",
    "image": "/images/premios/Kanui.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2015",
        "items": [
          "Bronze Cannes Lions (MEDIA – PRODUCT & SERVICE – CHARITIES (INCL. FUNDRAISING, DONATIONS & APPEALS))"
        ]
      }
    ]
  },
  {
    "id": 21,
    "title": "Likes Que Ajudam",
    "client": "Santa Casa",
    "image": "/images/premios/likes-que-ajudam.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2013",
        "items": [
          "Shortlist Cannes Lion"
        ]
      }
    ]
  },
  {
    "id": 22,
    "title": "Xixi Elétrico",
    "client": "Afroreggae",
    "image": "/images/premios/xixi_eletrico.jpg",
    "festivals": [
      {
        "festival": "Cannes Lions 2013",
        "items": [
          "Shortlist Cannes Lions"
        ]
      }
    ]
  },
  {
    "id": 23,
    "title": "The Clean Braille",
    "client": "Lifebuoy",
    "image": "/images/premios/clean-braille.png",
    "festivals": [
      {
        "festival": "Cannes Lions 2013",
        "items": [
          "Shortlist Cannes Lion"
        ]
      }
    ]
  }
];

import img from "@/components/items/BUJORI.jpeg";
import img1 from "@/components/items/CRIZANTEME.jpg";
import img5 from "@/components/items/5.jpeg";
import img7 from "@/components/items/HORTENSII.jpg";
import img8 from "@/components/items/8.jpeg";
import img9 from "@/components/items/TRANDAFIRI.jpg";

export const SIDENAV_ITEMS = [
  {
    title: "PLANTE",
    path: "/speciale/plante",
  },

  {
    title: "BUCHETE FLORI",
    path: "/buchete",
    submenu: true,
    subMenuItems: [
      {
        title: "Buchet de flori uscate",
        path: "/buchete/buchete-flori-uscate",
      },
      { title: "Buchet de trandafiri", path: "/buchete/buchete-trandafiri" },
      {
        title: "Buchet flori de primavara",
        path: "/buchete/buchete-flori-primavara",
      },
      { title: "Buchet flori de vara", path: "/buchete/buchete-flori-vara" },
      {
        title: "Buchet flori de toamna",
        path: "/buchete/buchete-flori-toamna",
      },
    ],
  },
  {
    title: "ARANJAMENTE FLORALE",
    path: "/aranjamente",
    submenu: true,
    subMenuItems: [
      {
        title: "Aranjament nou-nascut",
        path: "/aranjamente/aranjamente-nou-nascut",
      },
      {
        title: "Aranjament cu flori uscate",
        path: "/aranjamente/aranjamente-flori-uscate",
      },
      {
        title: "Aranjament cu trandafiri",
        path: "/aranjamente/aranjamente-trandafiri",
      },
      {
        title: "Aranjament cu flori de primavara",
        path: "/aranjamente/aranjamente-flori-primavara",
      },
      {
        title: "Aranjament cu flori de vara",
        path: "/aranjamente/aranjamente-flori-vara",
      },
      {
        title: "Aranjament cu flori de toamna",
        path: "/aranjamente/aranjamente-flori-toamna",
      },
    ],
  },
  {
    title: "FLORI CRIOGENATE",
    path: "/speciale/flori-criogenate",
  },
  {
    title: "OCAZII SPECIALE",
    path: "/ocazii-speciale",
    submenu: true,
    subMenuItems: [
      { title: "Flori de Craciun", path: "/ocazii-speciale/craciun" },
      {
        title: "Flori de Sf. Valentin",
        path: "/ocazii-speciale/sf-valentin",
      },
      { title: "Flori de 1 si 8 Martie", path: "/ocazii-speciale/martie" },
      { title: "Flori de Paste", path: "/ocazii-speciale/paste" },
    ],
  },

  {
    title: "EVENIMENTE",
    path: "/evenimente",
    submenu: true,
    subMenuItems: [
      {
        title: "LUMANARI",
        path: "/evenimente/lumanari",
      },
      {
        title: "BOTEZ",
        path: "/evenimente/botez",
        subMenuItemsMenu: [
          {
            title: "Aranjamente florale",
            path: "/evenimente/botez/aranjamente-florale",
          },
          {
            title: "Aranjamente cristelnita",
            path: "/evenimente/botez/aranjamente-cristelnita",
          },

          {
            title: "Lumanari de botez cu flori naturale ",
            path: "/evenimente/botez/lumanari-botez",
          },
          {
            title: "Photo corner",
            path: "/evenimente/botez/photo-corner",
          },

          {
            title: "Fantana de ciocolata",
            path: "/evenimente/botez/fantana-ciocolata",
          },
        ],
      },

      {
        title: "NUNTA",
        path: "/evenimente/nunta",
        subMenuItemsMenu: [
          {
            title: "Nunti complete",
            path: "/evenimente/nunta/nunta-completa",
          },
          {
            title: "Aranjamente florale",
            path: "/evenimente/nunta/aranjamente-masa",
          },
          {
            title: "Buchet de mireasa",
            path: "/evenimente/nunta/buchete-mireasa",
          },

          {
            title: "Intrare in sala si covor rosu",
            path: "/evenimente/nunta/intrare-sala-covor-rosu",
          },
          {
            title: "Corsaj, cocarede, bratari si coronite",
            path: "/evenimente/nunta/corsaj-cocarede-bratari-coronite",
          },
          {
            title: "Biserica",
            path: "/evenimente/nunta/biserica",
          },
          {
            title: "Lumanari de biserica cu flori naturale",
            path: "/evenimente/nunta/lumanari-biserica",
          },
          {
            title: "Cununie civila",
            path: "/evenimente/nunta/cununie-civila",
          },
          {
            title: "Aranjament masa oficiala",
            path: "/evenimente/nunta/masa-oficiala",
          },
          {
            title: "Aranjamente sala",
            path: "/evenimente/nunta/decoratiuni-sali",
          },

          { title: "Photo corner", path: "/evenimente/nunta/photo-corner" },
          {
            title: "Fantana de ciocolata",
            path: "/evenimente/nunta/fantana-ciocolata",
          },
          {
            title: "Masina de fum valsul mirilor",
            path: "/evenimente/nunta/masina-fum",
          },
          {
            title: "Decoratiuni masini",
            path: "/evenimente/nunta/decoratiuni-masini",
          },
        ],
      },
      {
        title: "CERE OFERTA",
        path: "/request-offer",
      },
    ],
  },
  {
    title: "COROANE FUNERARE",
    path: "/speciale/coroane-funerare",
    submenu: true,
    subMenuItems: [
      { title: "Coroane funerare", path: "/speciale/coroane-funerare/coroane" },
      {
        title: "Aranjamente icoane",
        path: "/speciale/coroane-funerare/aranjamente-coroane",
      },
    ],
  },
];

export const languagesLong = [
  { label: `Română`, value: "/auto/ro" },
  { label: "English", value: "/auto/en" },
];

export const languagesShort = [
  { label: `Ro`, value: "/auto/ro" },
  { label: "En", value: "/auto/en" },
];

export const PROFILE_MENU = [
  {
    href: "/profile/personal-data",
    title: "INFORMATII CONT ",
  },
  {
    href: "/profile/orders",
    title: "COMENZI",
  },
];

import immg from "./components/main-page/1.jpeg";
export const CAROUSEL_IMAGES = [
  {
    src: { immg },
  },
  {
    src: { immg },
  },
  {
    src: { immg },
  },
];

export const FOOTER_MENU = [
  { title: "Contact", href: "/contact" },
  { title: "Livrare", href: "/delivery" },
  { title: "Despre noi", href: "/about" },
  { title: "Termeni si conditii", href: "/terms-and-conditions" },
  { title: "Politica de confidentialitate", href: "/politics" },
  { title: "Politica Cookies", href: "/cookies" },
];

export const BUCHET_MENU = [
  {
    image: img,
    title: "BUCHET BUJORI",
  },
  {
    image: img1,
    title: "BUCHET CRIZANTEME",
  },
  {
    image: img8,
    title: "BUCHET LISIANTHUS",
  },
  {
    image: img5,
    title: "BUCHET LALELE",
  },
  {
    image: img9,
    title: "BUCHET TRANDAFIRI",
  },
  {
    image: img7,
    title: "BUCHET HORTENSII",
  },
];

export const SORT_ITEMS = [
  {
    title: "Recomandare",
  },
  {
    title: "Alfabetic, A-Z",
  },
  {
    title: "Alfabetic, Z-A",
  },

  {
    title: "Pret, de la mic la mare",
  },
  {
    title: "Pret, de la mare la mic",
  },
];

export const EXTRA_ITEMS = [
  {
    id: 1,
    name: "Cutie Raffaello",
    price: 50,
    description: "A fine bottle of red wine.",
    image:
      "https://res.cloudinary.com/defo6qykq/image/upload/v1723475366/floraria_hellen/extra/Screenshot_2024-08-10_at_23.54.49_u3thc8.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Candy",
    price: 30,
    description: "Delicious assorted candies.",
    image:
      "https://res.cloudinary.com/defo6qykq/image/upload/v1723475366/floraria_hellen/extra/Screenshot_2024-08-10_at_23.54.49_u3thc8.png",
    quantity: 1,
  },
  {
    id: 5,
    name: "Toffifee",
    price: 30,
    description: "Delicious assorted candies.",
    image:
      "https://res.cloudinary.com/defo6qykq/image/upload/v1724099042/floraria_hellen/extra/Screenshot_2024-08-19_at_23.23.54_k0oi9o.png",
    quantity: 1,
  },
  {
    id: 6,
    name: "Toffifee",
    price: 30,
    description: "Delicious assorted candies.",
    image:
      "https://res.cloudinary.com/defo6qykq/image/upload/v1724099042/floraria_hellen/extra/Screenshot_2024-08-19_at_23.23.54_k0oi9o.png",
    quantity: 1,
  },
  {
    id: 7,
    name: "Toffifee",
    price: 30,
    description: "Delicious assorted candies.",
    image:
      "https://res.cloudinary.com/defo6qykq/image/upload/v1724099042/floraria_hellen/extra/Screenshot_2024-08-19_at_23.23.54_k0oi9o.png",
    quantity: 1,
  },
];

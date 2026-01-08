// Liste des communes d'Abidjan
export const COMMUNES_ABIDJAN = [
  "Abobo",
  "Adjamé",
  "Anyama",
  "Attécoubé",
  "Bingerville",
  "Cocody",
  "Koumassi",
  "Marcory",
  "Plateau",
  "Port-Bouët",
  "Treichville",
  "Yopougon",
  "Songon",
] as const;

export type CommuneAbidjan = typeof COMMUNES_ABIDJAN[number];

// Jours de la semaine
export const JOURS_SEMAINE = [
  { id: "lundi", label: "Lundi", short: "Lun" },
  { id: "mardi", label: "Mardi", short: "Mar" },
  { id: "mercredi", label: "Mercredi", short: "Mer" },
  { id: "jeudi", label: "Jeudi", short: "Jeu" },
  { id: "vendredi", label: "Vendredi", short: "Ven" },
  { id: "samedi", label: "Samedi", short: "Sam" },
  { id: "dimanche", label: "Dimanche", short: "Dim" },
] as const;

export type JourSemaine = typeof JOURS_SEMAINE[number]["id"];

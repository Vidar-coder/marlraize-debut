export const DEBUT_COURT_TITLES = [
  "18 Roses",
  "18 Shots",
  "18 Candles",
  "18 Treasures",
  "18 Bills",
] as const

export type DebutCourtTitle = (typeof DEBUT_COURT_TITLES)[number]

export const DEBUT_COURT: Record<DebutCourtTitle, readonly string[]> = {
  "18 Roses": [
    "Warmyl Omilig",
    "Meldrick Omilig",
    "Andrie Mesias",
    "Philip Moldes",
    "Melchor Velagio",
    "Cristito Cornel",
    "Mikan Emnace",
    "Clyde Gacho",
    "Miguel Geonanga",
    "John Miles Pagsuguiron",
    "Aizer Jake Bitala",
    "Tristan Tuando",
    "Martin Yarra",
    "Lance Gaugano",
    "Sean Gb Gelera",
    "Clyde Diosana",
    "Jadnan Gonzaga",
    "Walt Omilig",
  ],
  "18 Shots": [
    "Jebez Velagio",
    "Jude lan Gaurana",
    "Amadeo Tuboc",
    "Mark Gamuza",
    "Vinnice Jillian Garcia",
    "Nyco Elardo",
    "Janelle Shane Micmic",
    "Romualdo Tubar",
    "Patricia Sotito",
    "Abigail Salcedo",
    "Kyla Czanne Diosana",
    "Gwen Manejable",
    "MM Velagio",
    "Jayson Karl Laguindam",
    "Apple Jhene Catin",
    "Johann Heinrich Pillo",
    "Sai Palacio",
    "Yanna Patrice Panagdato",
  ],
  "18 Candles": [
    "Maria Juda Adafe Liza",
    "Joanna Kaitlyn Torreflores",
    "Ashley Buenconsejo",
    "Janna Precious Tingson",
    "Chelsea Marie Fandiñola",
    "Sherey Belicena",
    "Athazia Grace Alunan",
    "Althea Jade Cadisal",
    "Sydney Rose Galleto",
    "Leanne Marie Animas",
    "Granaville Espinetra",
    "Eunice Faith Gamuza",
    "Hannah Tacluyan",
    "Loradel Tuboc",
    "Ann Jaizel Espanto",
    "Krista Lu Borres",
    "Jovimae Kate Lauro",
    "Andrea Mae Trish Tuando",
  ],
  "18 Treasures": [
    "Owen Omilig",
    "Micah Tuboc",
    "Regine Velagio",
    "Katherine Velagio",
    "Roselyn Lauriano",
    "Liza Gacho",
    "Rosemarie Galve",
    "Rose Palao",
    "Daisy Vingno",
    "Dolorosa Dumalag",
    "Jasmin Gelera",
    "Marynelle Distrito",
    "Rutchie Torrechilla",
    "Hazel Gacho",
    "Maricar Velagio",
    "Arlene Gaurana",
    "Marina Garmay",
    "Malou Omilig",
  ],
  "18 Bills": [
    "Melodia Omilig",
    "Ria Mesias",
    "Josephine Gange",
    "Generosa Espiso",
    "Liza Villarosa",
    "Charrie Edang",
    "Meldy Edang",
    "Joenito Gamuza",
    "Maricar Madadero",
    "Ian Louie Elardo",
    "Amy Terre",
    "Myrna Gamuza",
    "Merlita Moldes",
    "Tita Velagio",
    "Ma. Victoria Galgo",
    "Ronnie Gamuza",
    "Omar Gaurana",
    "Matilde Gajo",
  ],
}

export function canonicalCourtCategory(category: string): DebutCourtTitle | null {
  const normalized = category.trim().toLowerCase().replace(/\s+/g, " ")
  if (!normalized) return null
  if (
    normalized === "18 roses" ||
    normalized === "roses" ||
    normalized.includes("veil")
  ) {
    return "18 Roses"
  }
  if (normalized === "18 shots" || normalized === "shots" || normalized.includes("shot")) {
    return "18 Shots"
  }
  if (
    normalized === "18 candles" ||
    normalized === "candles" ||
    normalized.includes("candle")
  ) {
    return "18 Candles"
  }
  if (
    normalized === "18 treasures" ||
    normalized === "treasures" ||
    normalized.includes("treasure") ||
    normalized.includes("cord") ||
    normalized.includes("chord")
  ) {
    return "18 Treasures"
  }
  if (
    normalized === "18 bills" ||
    normalized === "bills" ||
    normalized.includes("bill") ||
    normalized.includes("ribbon") ||
    normalized.includes("pearl")
  ) {
    return "18 Bills"
  }
  return null
}

export function debutCourtApiRows() {
  return DEBUT_COURT_TITLES.flatMap((title) =>
    DEBUT_COURT[title].map((Name) => ({
      Name,
      RoleCategory: title,
      RoleTitle: "",
      Email: "",
    })),
  )
}

export function mergeSheetWithDebutCourt<T extends Record<string, unknown>>(rows: T[]) {
  const extras = rows.filter((row) => {
    const category = String(row.RoleCategory ?? row.roleCategory ?? "")
    return !canonicalCourtCategory(category)
  })
  return [...extras, ...debutCourtApiRows()]
}

export type Region =
  | "South India"
  | "East India"
  | "North India"
  | "Central India"
  | "West India"
  | "North-East India"

// 🐟 FISH BREEDS (BY REGION)
export const fishBreedsByRegion: Record<Region, string[]> = {
  "South India": ["Rohu", "Mrigal", "Common Carp"],

  "East India": ["Rohu", "Catla", "Mrigal", "Bata"],

  "North India": ["Rohu", "Catla", "Mrigal"],

  "Central India": ["Rohu", "Mrigal"],

  "West India": ["Rohu", "Common Carp"],

  "North-East India": ["Rohu", "Bata"],
}

// 🐔 POULTRY BREEDS (BY REGION)
export const poultryBreedsByRegion: Record<Region, string[]> = {
  "South India": ["Aseel", "Country Chicken"],

  "East India": ["Indigenous Desi Chicken", "Nicobari"],

  "North India": ["Kadaknath", "Local Desi Chicken"],

  "Central India": ["Kadaknath", "Desi Chicken"],

  "West India": ["Aseel", "Local Desi Chicken"],

  "North-East India": ["Local Indigenous Chicken", "Nicobari"],
}

// 🦆 DUCK BREEDS (BY REGION — EMPTY WHERE NOT VALID)
export const duckBreedsByRegion: Record<Region, string[]> = {
  "South India": [],

  "East India": ["Indian Runner Duck"],

  "North India": [],

  "Central India": [],

  "West India": [],

  "North-East India": ["Pati Duck"],
}
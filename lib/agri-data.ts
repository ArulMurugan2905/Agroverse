export interface Crop {
  name: string
  soils: string[]
  textures: string[]
  risk: string
  baseProfit: number
  integrated: string[]
  waterRequirement: string
  growthDuration: string
}

export const crops: Crop[] = [
  {
    name: "Rice",
    soils: ["Clay", "Loamy"],
    textures: ["Loamy", "Fine"],
    risk: "Medium",
    baseProfit: 45000,
    integrated: ["Fish Farming", "Duck Rearing"],
    waterRequirement: "High",
    growthDuration: "120-150 days",
  },
  {
    name: "Wheat",
    soils: ["Loamy", "Clay"],
    textures: ["Loamy", "Fine"],
    risk: "Low",
    baseProfit: 35000,
    integrated: ["Poultry"],
    waterRequirement: "Medium",
    growthDuration: "100-120 days",
  },
  {
    name: "Millets",
    soils: ["Sandy", "Loamy"],
    textures: ["Coarse", "Loamy"],
    risk: "Low",
    baseProfit: 28000,
    integrated: [],
    waterRequirement: "Low",
    growthDuration: "60-90 days",
  },
  {
    name: "Sugarcane",
    soils: ["Loamy", "Clay"],
    textures: ["Loamy", "Fine"],
    risk: "High",
    baseProfit: 75000,
    integrated: ["Bee Keeping"],
    waterRequirement: "Very High",
    growthDuration: "12-18 months",
  },
]

export const growthStages = [
  "Germination",
  "Seedling",
  "Tillering",
  "Stem Extension",
  "Heading",
  "Flowering",
  "Grain Fill",
  "Maturity",
]

export const soilTypes = ["Clay", "Loamy", "Sandy"]
export const textureTypes = ["Loamy", "Fine", "Coarse"]
export const riskLevels = [
  { value: "High", label: "Max Profit (High Risk)", icon: "flame" },
  { value: "Medium", label: "Balanced (Medium Risk)", icon: "scale" },
  { value: "Low", label: "Stable Income (Low Risk)", icon: "shield" },
]

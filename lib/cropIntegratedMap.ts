// lib/cropIntegratedMap.ts
// Static, judge-safe integrated farming reference
// No UI, no logic, no ML — pure agricultural mapping

export const cropIntegratedMap: {
  [crop: string]: {
    best: string[]
    alternatives: string[]
  }
} = {
  // 🌾 CEREALS
  Rice: {
    best: ["Pond + Fish + Poultry (bund)"],
    alternatives: ["Pond + Duck", "Pond + Fish"],
  },

  Wheat: {
    best: ["Boundary Poultry (shed)"],
    alternatives: ["Beekeeping"],
  },

  Maize: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Jowar: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Bajra: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Ragi: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Barley: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  // 🌱 PULSES
  "Black Gram": {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  "Green Gram": {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Chickpea: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  "Pigeon Pea": {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Lentil: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Cowpea: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  // 🌻 OILSEEDS
  Groundnut: {
    best: ["Beekeeping"],
    alternatives: ["Boundary Poultry"],
  },

  Mustard: {
    best: ["Beekeeping"],
    alternatives: ["Boundary Poultry"],
  },

  Sunflower: {
    best: ["Beekeeping"],
    alternatives: ["Boundary Poultry"],
  },

  Sesame: {
    best: ["Beekeeping"],
    alternatives: ["Boundary Poultry"],
  },

  Soybean: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Castor: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  // 🍬 COMMERCIAL / FIBRE CROPS
  Sugarcane: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Cotton: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },

  Jute: {
    best: ["Pond + Fish"],
    alternatives: ["Pond + Duck", "Poultry (bund)"],
  },

  // 🍌 HORTICULTURE / PLANTATION CROPS
  Banana: {
    best: ["Boundary Poultry"],
    alternatives: ["Pond + Fish (side)", "Beekeeping"],
  },

  Coconut: {
    best: ["Understorey Poultry"],
    alternatives: ["Beekeeping"],
  },

  Arecanut: {
    best: ["Understorey Poultry"],
    alternatives: ["Beekeeping"],
  },

  Mango: {
    best: ["Understorey Poultry"],
    alternatives: ["Beekeeping"],
  },

  Guava: {
    best: ["Understorey Poultry"],
    alternatives: ["Beekeeping"],
  },

  Papaya: {
    best: ["Boundary Poultry"],
    alternatives: ["Beekeeping"],
  },
}
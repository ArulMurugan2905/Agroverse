// lib/recommendationEngine.ts
// Rule-based recommendation engine
// Combines Crop → Integrated Farming → Region-wise Breed selection
// No ML, no randomness, fully explainable

import { cropIntegratedMap } from "./cropIntegratedMap"
import {
  fishBreedsByRegion,
  poultryBreedsByRegion,
  duckBreedsByRegion,
  Region,
} from "./regionBreedMap"

export interface FarmData {
  crop: string
  region: Region
}

export function getRecommendations(farmData: FarmData) {
  const { crop, region } = farmData

  // 1️⃣ Integrated farming model based on crop
  const integrated = cropIntegratedMap[crop]

  if (!integrated) {
    return {
      crop,
      integratedModels: null,
      breeds: {
        fish: [],
        poultry: [],
        duck: [],
      },
    }
  }

  // 2️⃣ Breed selection based on region + integrated model
  const fish = integrated.best.some(model =>
    model.toLowerCase().includes("fish")
  )
    ? fishBreedsByRegion[region]
    : []

  const poultry = integrated.best.some(model =>
    model.toLowerCase().includes("poultry")
  )
    ? poultryBreedsByRegion[region]
    : []

  const duck = integrated.best.some(model =>
    model.toLowerCase().includes("duck")
  )
    ? duckBreedsByRegion[region]
    : []

  // 3️⃣ Final explainable recommendation
  return {
    crop,
    integratedModels: {
      best: integrated.best,
      alternatives: integrated.alternatives,
    },
    breeds: {
      fish,
      poultry,
      duck,
    },
  }
}
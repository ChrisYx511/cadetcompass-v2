import { ObjectId } from "mongodb"
import { getUnit, dbClient } from "./db"

export async function initializeUnit(userProfile: any) {
  const unit = await getUnit({ id: userProfile.unit })
  return unit
}



import { ObjectId } from "mongodb"
import { dbClient, dbName, DBUnit, DBUser } from "./db"

export async function getUnit({ name, number, element, id }: any) {
  try {
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const unitCollection = db.collection("units")
    if (id) {
      const query = { _id: id }
      const unit = await unitCollection.findOne(query)
      return unit as DBUnit
    }
    const query = { name: name, number: number, element: element }
    const unit = await unitCollection.findOne(query)
    return unit as DBUnit
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function initializeUnit(userProfile: any) {
  const unit = await getUnit({ id: userProfile.unit })
  return unit
}

export async function associateUserAndUnit(
  userObjectId: ObjectId,
  unitObjectId: ObjectId,
) {
  try {
    await dbClient.connect()
    const queryUser = { _id: userObjectId }
    const db = dbClient.db(dbName)
    const userCollection = db.collection("users")
    const updateDoc = {
      $set: {
        unit: unitObjectId,
      },
    }
    const user = await userCollection.findOneAndUpdate(queryUser, updateDoc)
    return user as DBUser
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function createUnit({
  name,
  number,
  element,
  region,
}: {
  name: string
  number: number
  element: "SEA" | "AIR" | "ARMY"
  region: string
}) {
  try {
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const unitCollection = db.collection("units")
    const query = { name: name, number: number, element: element }
    let unit = await unitCollection.findOne(query)
    if (!unit) {
      const newUnit = new DBUnit(name, number, element, region)
      const result = await unitCollection.insertOne(newUnit)
      const unit = await unitCollection.findOne(query)
      return unit as DBUnit
    }
    return unit as DBUnit
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

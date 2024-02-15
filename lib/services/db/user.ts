import { dbClient, dbName, DBUser } from "./db"
import { associateUserAndTrainingFile } from "@/lib/services/db/trainingFiles"

export async function createUser({ user }: any) {
  try {
    if (!user) {
      throw Error("User Not Provided")
    }
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const userCollection = db.collection("users")
    const query = { oauthID: user.id }
    const modifyDate = {
      $set: {
        lastLoginDate: new Date(),
      },
    }
    const dbProfile = await userCollection.findOneAndUpdate(query, modifyDate)
    if (!dbProfile) {
      const newProfile = new DBUser(user.name, user.email, user.id)
      const result = await userCollection.insertOne(newProfile)
      console.log(`A document was inserted with the _id: ${result.insertedId}`)
      const dbProfile = await userCollection.findOne(query)
      return dbProfile as DBUser
    }
    if (!dbProfile.trainingFile) {
      const db = dbClient.db(dbName)
      const tfCollection = db.collection("trainingFiles")
      const tfQuery = { accountEmail: dbProfile.email }
      const tf = await tfCollection.findOne(tfQuery)
      if (!tf) {
        return dbProfile as DBUser
      }
      await associateUserAndTrainingFile(dbProfile._id, tf?._id)
    }
    return dbProfile as DBUser
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function initializeUser(session: any) {
  if (!session) {
    throw Error("[FATAL]: Session Unavailable, unable to create user store.")
  }
  const userProfile = await createUser(session)
  return userProfile as DBUser
}

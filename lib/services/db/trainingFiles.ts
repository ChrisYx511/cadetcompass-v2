import { ObjectId } from "mongodb"
import { dbClient, dbName, DBTrainingFile, DBUser } from "./db"

export async function getTrainingFile({ fname, lname, cin, id, userId }: any) {
  try {
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const trainingFileCollection = db.collection("trainingFiles")
    if (id) {
      const query = { _id: id }
      const trainingFile = await trainingFileCollection.findOne(query)
      return trainingFile as DBTrainingFile
    }
    if (userId) {
      const query = { associatedUser: id }
      const trainingFile = await trainingFileCollection.findOne(query)
      return trainingFile as DBTrainingFile
    }
    const query = { firstName: fname, lastName: lname, cin: cin }
    const trainingFile = await trainingFileCollection.findOne(query)
    return trainingFile as DBTrainingFile
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function initializeTrainingFile(userProfile: any) {
  const trainingFile = await getTrainingFile({ id: userProfile.trainingFile })
  return trainingFile
}

export async function associateUserAndTrainingFile(
  userObjectId: ObjectId,
  trainingFileObjectId: ObjectId,
) {
  try {
    await dbClient.connect()
    const queryUser = { _id: userObjectId }
    const queryTF = { _id: trainingFileObjectId }
    const db = dbClient.db("cadetcompass_v2")
    const userCollection = db.collection("users")
    const tfCollection = db.collection("trainingFiles")
    const updateUserDoc = {
      $set: {
        trainingFile: trainingFileObjectId,
      },
    }
    const updateTFDoc = {
      $set: {
        associatedUser: userObjectId,
      },
    }
    const user = await userCollection.findOneAndUpdate(queryUser, updateUserDoc)
    await tfCollection.updateOne(queryTF, updateTFDoc)
    return user as DBUser
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function associateUnitAndTrainingFile(
  unitObjectId: ObjectId,
  trainingFileObjectId: ObjectId,
) {
  try {
    await dbClient.connect()
    const queryTF = { _id: trainingFileObjectId }
    const db = dbClient.db("cadetcompass_v2")
    const tfCollection = db.collection("trainingFiles")
    const updateTFDoc = {
      $set: {
        associatedUnit: unitObjectId,
      },
    }
    const tf = await tfCollection.findOneAndUpdate(queryTF, updateTFDoc)
    return tf as DBTrainingFile
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}
export async function getAllTfMatching(query: any) {
  try {
    await dbClient.connect()
    const queryTF = query
    const db = dbClient.db("cadetcompass_v2")
    const tfCollection = db.collection("trainingFiles")
    const tf = await tfCollection.find(queryTF).toArray()
    return tf as DBTrainingFile[]
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function createNewTrainingFile({
  fname,
  lname,
  email,
  cin,
  rank,
  mainUnit,
}: {
  fname: string
  lname: string
  email: string
  cin: number
  rank: string
  mainUnit?: ObjectId
}) {
  try {
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const trainingFileCollection = db.collection("trainingFiles")
    const query = { firstName: fname, lastName: lname, cin: cin }
    const trainingFile = await trainingFileCollection.findOne(query)
    if (!trainingFile) {
      const newTf = new DBTrainingFile(fname, lname, cin, email, rank, mainUnit)
      const result = await trainingFileCollection.insertOne(newTf)
      const trainingFile = await trainingFileCollection.findOne(query)
      return trainingFile as DBTrainingFile
    }
    return trainingFile as DBTrainingFile
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

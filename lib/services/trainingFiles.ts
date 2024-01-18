import { ObjectId } from "mongodb"
import { dbClient, getTrainingFile } from "./db"

export async function initializeTrainingFile(userProfile: any) {
  const trainingFile = await getTrainingFile({ id: userProfile.trainingFile})
  return trainingFile
}

export async function associateUserAndTrainingFile(userObjectId: ObjectId, trainingFileObjectId: ObjectId) {
    try {
    await dbClient.connect()
    const queryUser = { _id: userObjectId }
    const queryTF = {_id: trainingFileObjectId}
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
        associatedUser: userObjectId
      }
    }
    const user = await userCollection.findOneAndUpdate(queryUser, updateUserDoc)
    await tfCollection.updateOne(queryTF, updateTFDoc)
    return user
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

export async function associateUnitAndTrainingFile(unitObjectId: ObjectId, trainingFileObjectId: ObjectId) {
    try {
    await dbClient.connect()
    const queryTF = {_id: trainingFileObjectId}
    const db = dbClient.db("cadetcompass_v2")
    const tfCollection = db.collection("trainingFiles")
    const updateTFDoc = {
      $set: {
        associatedUnit: unitObjectId
      }
    }
    const tf = await tfCollection.findOneAndUpdate(queryTF, updateTFDoc)
    return tf
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
    return tf
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}
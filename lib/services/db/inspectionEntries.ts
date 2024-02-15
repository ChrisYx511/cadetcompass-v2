import { FindOptions, ObjectId } from "mongodb"
import { dbClient, dbName } from "@/lib/services/db/db"

export class DBInspectionEntry {
  _id?: ObjectId
  associatedTrainingFile: ObjectId
  comments?: string
  score: number
  createdDate: Date
  inspectionDate: Date
  constructor(
    assocTf: ObjectId,
    score: number,
    insDate: Date,
    comments?: string,
  ) {
    this.associatedTrainingFile = assocTf
    this.score = score
    this.comments = comments || ""
    this.createdDate = new Date()
    this.inspectionDate = insDate
  }
}

/**
 * Find a certain number of inspection entries and return them as <code>DBInspectionsEntry</code>
 * @param assocTF <code>ObjectId</code> of the associated training file
 * @param entries how many to return in the array
 */
export async function getInspections(assocTF: ObjectId, entries: number) {
  try {
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const inspections = db.collection("inspections")
    const query = {
      associatedTrainingFile: assocTF,
    }
    const options: FindOptions<Document> = {
      sort: { createdDate: -1 },
    }
    const cursor = inspections.find(query, options)
    let results: any[] = []
    for (let i = 0; i < entries; i++) {
      let res = await cursor.next()
      if (!res) {
        break
      }
      results.push(res)
    }
    return results as DBInspectionEntry[]
  } catch (e: any) {
    console.log(e)
  } finally {
    await dbClient.close()
  }
}

export async function createInspection(data: DBInspectionEntry) {
  try {
    await dbClient.connect()
    const db = dbClient.db(dbName)
    const inspections = db.collection("inspections")
    return await inspections.insertOne(data)
  } catch (err: any) {
    console.log(err)
  } finally {
    await dbClient.close()
  }
}

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"

export const uri = process.env.MONGODB_CONNECT_STRING
export const dbName = process.env.MONGODB_DB_NAME
if (!uri) {
  throw new Error("MongoClient (db.ts): No Connection String!")
}
if (!dbName) {
  throw new Error("MongoClient (db.ts): No DB Name!")
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const dbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
export async function ping() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await dbClient.connect()
    // Send a ping to confirm a successful connection
    await dbClient.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    )
  } finally {
    // Ensures that the client will close when you finish/error
    await dbClient.close()
  }
}

export class DBUser {
  _id?: ObjectId
  name: string
  email: string
  oauthID: string
  unit?: ObjectId | string
  trainingFile?: ObjectId | string
  createdDate: Date
  lastLoginDate?: Date | string
  permissionLevel?: number
  constructor(name: string, email: string, oauthID: string) {
    this.name = name
    this.email = email
    this.oauthID = oauthID
    this.unit = ""
    this.trainingFile = ""
    this.createdDate = new Date()
    this.lastLoginDate = ""
    this.permissionLevel = 2
  }
}

export class DBUnit {
  _id?: ObjectId
  name: string
  number: number
  element: "SEA" | "AIR" | "ARMY"
  region: string
  createdDate: Date
  constructor(
    name: string,
    number: number,
    element: "SEA" | "AIR" | "ARMY",
    region: string,
  ) {
    this.name = name
    this.number = number
    this.element = element
    this.region = region
    this.createdDate = new Date()
  }
}

export class DBTrainingFile {
  _id?: ObjectId
  firstName: string
  lastName: string
  cin: number
  personalEmail: string
  accountEmail: string
  associatedUser: ObjectId | ""
  associatedUnit: ObjectId | ""
  rank: string
  awards: ObjectId[] | []
  additionalUnits: ObjectId[] | []
  createdDate: Date
  commServiceRecord?: Array<{
    name: string
    numberOfHours: number
    createdDate: Date
  }>
  constructor(
    fname: string,
    lname: string,
    cin: number,
    persEmail: string,
    rank: string,
    mainUnit?: ObjectId,
  ) {
    this.firstName = fname
    this.lastName = lname
    this.cin = cin
    this.personalEmail = persEmail
    this.accountEmail = ""
    this.associatedUser = ""
    if (mainUnit) {
      this.associatedUnit = mainUnit
    } else {
      this.associatedUnit = ""
    }

    this.rank = rank
    this.awards = []
    this.additionalUnits = []
    this.createdDate = new Date()
  }
}

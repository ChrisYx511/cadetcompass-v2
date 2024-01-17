import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = process.env.MONGODB_CONNECT_STRING
const dbName = process.env.MONGODB_DB_NAME
if (!uri) {
    throw ("No Connection String!")
}
if (!dbName) {
    throw("No DB Name!")
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export async function ping() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

class DBUser {
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

class DBUnit {
    name: string
    number: number
    element: "SEA" | "AIR" | "ARMY"
    region: string
    createdDate: Date
    constructor(name: string, number: number, element: "SEA" | "AIR" | "ARMY", region: string) {
        this.name = name
        this.number = number
        this.element = element
        this.region = region
        this.createdDate = new Date()
    }
}


export async function createUser({user}: any) {
    try {
        if (!user) {
            throw Error("User Not Provided")
        }
        await client.connect()
        const db = client.db(dbName)
        const userCollection = db.collection("users")
        const query = { oauthID: user.id }
        const modifyDate = {
            $set: {
                lastLoginDate: new Date()
            }
        }
        const dbProfile = await userCollection.findOneAndUpdate(query, modifyDate)
        if (!dbProfile) {
            const newProfile = new DBUser(
                user.name,
                user.email,
                user.id,
            )
            const result = await userCollection.insertOne(newProfile)
            console.log(`A document was inserted with the _id: ${result.insertedId}`)
            const dbProfile = await userCollection.findOne(query)
            return dbProfile
        }
        return dbProfile
    } 
    catch (err: any) {
        console.log(err)
    }
    finally {
        await client.close()

    }
}

export async function getUnit({name, number, element, id}: any) {
    try {
        await client.connect()
        const db = client.db(dbName)
        const unitCollection = db.collection("units")
        if (id) {
            const query = { _id: id }
            const unit = unitCollection.findOne(query)
            return unit
        }
        const query = {name: name, number: number, element: element}
        const unit = unitCollection.findOne(query)
        return unit
    } 
    catch (err: any) {
        console.log(err)
    }
    finally {
        await client.close()
    }
}

export async function createUnit({name, number, element, region} : {name: string, number: number, element: "SEA" | "AIR" | "ARMY", region: string}) {
    try {
        await client.connect()
        const db = client.db(dbName)
        const unitCollection = db.collection("units")
        const query = {name: name, number: number, element: element}
        let unit = await unitCollection.findOne(query)
        if (!unit) {
            const newUnit = new DBUnit(name, number, element, region)
            const result = await unitCollection.insertOne(newUnit)
            const unit = await unitCollection.findOne(query)
            return unit
        }
        return unit
    }
    catch (err: any) {
        console.log(err)
    }
    finally{
        await client.close()
    }
}

export async function associateUserAndUnit(userObjectId: ObjectId, unitObjectId: ObjectId) {
    try {
        await client.connect()
        const queryUser = { _id : userObjectId}
        const db = client.db("cadetcompass_v2")
        const userCollection = db.collection("users")
        const updateDoc = {
            $set: {
                unit: unitObjectId
            }
        }
        const user = await userCollection.findOneAndUpdate(queryUser, updateDoc)
        return user
    }
    catch (err: any) {
        console.log(err)
    }
    finally{
        await client.close()
    }
}
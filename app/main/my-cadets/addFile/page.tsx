import { initializeSession } from "@/lib/services/session"
import { initializeUnit } from "@/lib/services/unit"
import { initializeUser } from "@/lib/services/user"
import NewFileForm from "./(components)/Form"
import { FileWarning } from "lucide-react"
import { createNewTrainingFile } from "@/lib/services/db"
import { ObjectId } from "mongodb"

async function AddTrainingFile() {
  const session = await initializeSession()
  const user = await initializeUser(session)
  if (user?.permissionLevel > 1) {
    return (
      <div className="bg-yellow-50 outline outline-yellow-400 rounded-lg p-6 py-8 m-4">
        <h2 className="text-xl">
          <FileWarning></FileWarning> Unauthorized
        </h2>
      </div>
    )
  }
  if (!user?.unit) {
    return (
      <div className="bg-yellow-50 outline outline-yellow-400 rounded-lg p-6 py-8 m-4">
        <h2 className="text-xl">
          <FileWarning></FileWarning> You have not been assigned to a unit.
        </h2>
      </div>
    )
  }
  const unit = await initializeUnit(user)

  async function createDBEntry(values: any) {
    "use server"
    const tf = await createNewTrainingFile({
      fname: values.firstName,
      lname: values.lastName,
      email: values.email,
      cin: Number(values.cin),
      rank: values.rank,
      mainUnit: new ObjectId(unit?._id),
    })
  }

  return (
    <div className="m-4">
      <NewFileForm updateItem={createDBEntry}></NewFileForm>
    </div>
  )
}

export default AddTrainingFile

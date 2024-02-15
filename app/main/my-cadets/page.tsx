import { Button } from "@/components/ui/button"
import { initializeSession } from "@/lib/services/session"
import { getAllTfMatching } from "@/lib/services/db/trainingFiles"
import { initializeUnit } from "@/lib/services/db/unit"
import { initializeUser } from "@/lib/services/db/user"
import { FileWarning, Info } from "lucide-react"

async function getAllTfFromUnit(unit: any) {
  const arrOfTf = await getAllTfMatching({ associatedUnit: unit._id })
  return arrOfTf
}

async function ManageCadetsPage() {
  const session = await initializeSession()
  const user = await initializeUser(session)
  if (!user) {
    throw new Error("Networking Error!")
  }
  console.log(user)
  if (user.permissionLevel === undefined || user?.permissionLevel > 1) {
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
  const arrOfTf = await getAllTfFromUnit(unit)
  console.log(arrOfTf)
  return (
    <div>
      <div className="bg-yellow-50 outline outline-yellow-400 rounded-lg p-6 py-8 m-4">
        <h2>
          <Info></Info> My Cadet Corps: {unit?.number + " " + unit?.name}
        </h2>
      </div>
      {arrOfTf?.map((tf, i) => (
        <div
          key={i}
          className="m-4 flex flex-row outline outline-1 outline-gray-400 p-2 items-center rounded-lg"
        >
          <div className="mx-auto"> {tf.firstName + " " + tf.lastName}</div>
          <div className="mx-auto">{tf.cin}</div>
          <div className="mx-2">
            <Button>Associate</Button>
          </div>
          <div className="mx-2">
            <Button>Profile</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ManageCadetsPage

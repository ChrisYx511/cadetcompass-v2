import { initializeSession } from "@/lib/services/session"
import { initializeUser } from "@/lib/services/db/user"
import CommunityServiceSummary from "@/app/main/(dashboard)/(components)/CommunityServiceSummary"
import { getTrainingFile } from "@/lib/services/db/trainingFiles"
import {
  createInspection,
  DBInspectionEntry,
} from "@/lib/services/db/inspectionEntries"
import InspectionsSummary from "@/app/main/(dashboard)/(components)/InspectionsSummary"
import AddTestInspectionsButton from "@/app/main/(dashboard)/(components)/AddTestInspectionsButton"

/**
 * Adds 10 test inspections to DB of type DB
 */

async function Dashboard() {
  const session = await initializeSession()
  const user = await initializeUser(session)
  const userTf = await getTrainingFile({ id: user?.trainingFile })
  console.log(user)
  if (!userTf) {
    return <div>You have not been assigned to a training file!</div>
  }
  async function addTestInspections() {
    "use server"
    for (let i: number = 0; i < 5; i++) {
      if (userTf?._id === undefined) return
      const test = await createInspection(
        new DBInspectionEntry(
          userTf._id,
          Math.random() * 2,
          new Date(),
          "Very good, just spend more time cleaning your hat!",
        ),
      )
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <CommunityServiceSummary
        trainingProfile={userTf}
      ></CommunityServiceSummary>
      <InspectionsSummary trainingFile={userTf}></InspectionsSummary>
    </div>
  )
}

export default Dashboard

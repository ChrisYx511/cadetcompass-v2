import { Suspense } from "react"
import DefaultLoading from "../../loading"
import { initializeSession } from "@/lib/services/session"
import { initializeUser } from "@/lib/services/user"
import { getTrainingFile } from "@/lib/services/db"
import CommunityServiceSummary from "@/app/main/(dashboard)/(components)/CommunityServiceSummary"

async function Dashboard() {
  const session = await initializeSession()
  const user = await initializeUser(session)
  const userTf = await getTrainingFile({ id: user?.trainingFile })
  console.log(user)
  if (!userTf) {
    return <div>You have not been assigned to a training file!</div>
  }
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <CommunityServiceSummary
        trainingProfile={userTf}
      ></CommunityServiceSummary>
    </div>
  )
}

export default Dashboard

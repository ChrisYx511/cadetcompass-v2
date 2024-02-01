import { DBTrainingFile } from "@/lib/services/db"

async function CommunityServiceSummary({
  trainingProfile,
}: {
  [trainingProfile: string]: any
}) {
  async function getTotalCommServiceHours() {
    let sum: number = 0
    for (let i = 0; i < trainingProfile.commServiceRecord.length; i++) {
      sum += trainingProfile.commServiceRecord[i].numberOfHours
    }
    return sum
  }
  const totalCommServiceHours: number = await getTotalCommServiceHours()
  return (
    <div className="bg-yellow-500 align-middle text-center rounded-lg mx-4">
      <div className="text-center m-4">
        <h2 className="text-yellow-800 text-xl font-bold ">
          Community Service
        </h2>
        <br />
        <span className="font-black text-white text-5xl">
          {totalCommServiceHours}
        </span>
        <br />
        <span className="text-yellow-800">hours</span>
        <br />
        <br />
        <span className="">Good going!</span>
      </div>
    </div>
  )
}

export default CommunityServiceSummary

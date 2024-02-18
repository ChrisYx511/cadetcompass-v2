import { DBTrainingFile } from "@/lib/services/db/db"
import {
  DBInspectionEntry,
  getInspections,
} from "@/lib/services/db/inspectionEntries"

async function InspectionsSummary({
  trainingFile,
}: {
  trainingFile: DBTrainingFile
}) {
  let avg: number = 0
  async function getInspectionsAndAvg() {
    if (!trainingFile._id) return [] as DBInspectionEntry[]
    const inspections = await getInspections(trainingFile._id, 10)
    console.log(inspections)
    if (inspections == null || inspections.length === 0)
      return [] as DBInspectionEntry[]
    let sum: number = 0
    for (let i: number = 0; i < inspections.length; i++) {
      sum += inspections[i].score
    }
    avg = sum / inspections.length
    console.log(inspections)
    return inspections
  }
  const obtainedInspections = await getInspectionsAndAvg()
  if (obtainedInspections.length === 0) {
    return <div></div>
  }
  return (
    <div className="col-span-2 bg-yellow-200 border-yellow-600 border-2 rounded-lg p-3">
      <h2 className="text-xl font-bold text-center">Latest Inspections</h2>
      <div className="grid grid-cols-3 my-2">
        <div className="flex flex-col">
          <h3 className="text-center font-extrabold text-4xl m-auto">
            {Math.round(avg * 10) / 10}{" "}
          </h3>
          <p className="text-center">Average Score</p>
        </div>
        <div className="col-span-2">
          <h3 className="text-xl font-bold">Latest Comments</h3>
          {obtainedInspections.map((entry, i) => (
            <div key={i}>{entry.comments}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InspectionsSummary

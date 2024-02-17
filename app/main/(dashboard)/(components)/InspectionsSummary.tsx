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
  return (
    <div>
      {avg}
      <div>
        {obtainedInspections.map((entry, i) => (
          <div key={i}>{entry.comments}</div>
        ))}
      </div>
    </div>
  )
}

export default InspectionsSummary

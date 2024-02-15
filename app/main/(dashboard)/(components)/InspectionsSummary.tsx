import { DBTrainingFile } from "@/lib/services/db/db"

async function InspectionsSummary({
  trainingFile,
}: {
  trainingFile: DBTrainingFile
}) {
  const latestInspections = "test" // TODO: Add Query to Inspections Collection using training file association

  return <div></div>
}

export default InspectionsSummary

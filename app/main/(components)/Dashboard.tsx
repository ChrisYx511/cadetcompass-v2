import { Suspense } from "react"
import DefaultLoading from "../loading"

async function Dashboard() {
  const test = await new Promise((resolve) => setTimeout(resolve, 5000))
  return <div>Test</div>
}

export default Dashboard

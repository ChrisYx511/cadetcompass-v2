import { Suspense } from "react"
import DefaultLoading from "../loading"
import Dashboard from "../(components)/Dashboard"

function MainPage() {
  return (
    <div className="grid grid-cols-1 p-4">
      <div className=" bg-gradient-to-t from-yellow-300 to-yellow-600 rounded-lg p-6 py-12">
        <h1 className="text-5xl text-white">Welcome Back!</h1>
      </div>
      <div>
        <Suspense fallback={<DefaultLoading />}>
          <Dashboard></Dashboard>
        </Suspense>
      </div>
    </div>
  )
}

export default MainPage

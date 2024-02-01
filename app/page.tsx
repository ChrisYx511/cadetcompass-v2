import { ping } from "@/lib/services/db"
import CheeseCounter from "./(components)/Cheese"

async function LandingPage() {
  await ping()
  return (
    <div className="text-3xl m-4">
      Hello World!
      <CheeseCounter></CheeseCounter>
    </div>
  )
}

export default LandingPage

import { ping } from "@/lib/services/db/db"
import CheeseCounter from "./(components)/Cheese"
import { redirect } from 'next/navigation';

async function LandingPage() {
  await ping()
    redirect("/main")
  return (
    <div className="text-3xl m-4">
      Hello World!
      <CheeseCounter></CheeseCounter>
    </div>
  )
}

export default LandingPage

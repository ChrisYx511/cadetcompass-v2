"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
function CheeseCounter() {
  const [numOfCheese, setNumOfCheese] = useState(0)

  return (
    <div>
      <Button
        className="bg-yellow-500 hover:bg-yellow-300"
        onClick={() => setNumOfCheese(numOfCheese + 1)}
      >
        Number of Cheese: {numOfCheese}
      </Button>
    </div>
  )
}

export default CheeseCounter

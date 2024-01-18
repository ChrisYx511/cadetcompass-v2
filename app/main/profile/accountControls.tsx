"use client"
import { signOut } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/navigation"
function AccountControls() {
  return (
    <button
      className="m-4 p-4 rounded-lg bg-teal-700 hover:bg-teal-700/90"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  )
}

export default AccountControls

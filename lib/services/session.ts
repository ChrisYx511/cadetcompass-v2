import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions"
import { getServerSession } from "next-auth"

export async function initializeSession() {
  const session = await getServerSession(authOptions)
  console.log("Session Reloaded")
  return session
}

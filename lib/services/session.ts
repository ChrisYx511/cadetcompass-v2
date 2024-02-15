import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions"
import { getServerSession, Session } from "next-auth"

export interface CdtCompassSession extends Session {
  user: {
    name: string
    email: string
    image: string | null | undefined
    id: string
    username: string
  }
}
export async function initializeSession() {
  const session = await getServerSession(authOptions)
  console.log("Session Reloaded")
  console.log(session)
  return session as CdtCompassSession
}

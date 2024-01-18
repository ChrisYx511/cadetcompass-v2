import { createUser, DBUser } from "./db"

export async function initializeUser(session: any) {
  if (!session) {
    throw Error("[FATAL]: Session Unavailable, unable to create user store.")
  }
  const userProfile = await createUser(session)
  return userProfile
}

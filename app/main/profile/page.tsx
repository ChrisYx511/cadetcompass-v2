import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions"
import { getServerSession } from "next-auth"
import AccountControls from "./accountControls"
import { associateUserAndUnit, createUnit } from "@/lib/services/db/unit"
import { createUser } from "@/lib/services/db/user"

async function ProfilePage() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      User: {session && session.user ? session.user.email : "N/A"} <br />
      Name: {session && session.user ? session.user.name : "N/A"} <br />
      <a href="/main">Click</a>
      <AccountControls></AccountControls>
    </div>
  )
}

export default ProfilePage

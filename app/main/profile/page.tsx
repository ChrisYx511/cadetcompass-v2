import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import { getServerSession } from "next-auth";
import AccountControls from "./accountControls";
import { createUser, createUnit, associateUserAndUnit} from "@/lib/db";

async function getSession() {
    const session = await getServerSession(authOptions)
    return session
}

async function ProfilePage() {
    const session = await getSession()
    console.log(session?.user)
    const dbProfile = await createUser(session)
    const unit = await createUnit({name: "Victory", number: 6, element: "SEA", region: "Eastern"})
    if (unit && dbProfile && (unit["_id"] != dbProfile.unit)) {
        associateUserAndUnit(dbProfile._id, unit._id)
    }
    console.log(unit)
    console.log(dbProfile)
    return ( 
        <div>
            User: {session && session.user ? session.user.email : "N/A"} <br/>
            Name: {session && session.user ? session.user.name : "N/A"} <br />
            <AccountControls></AccountControls>
        </div>
     );
}

export default ProfilePage;
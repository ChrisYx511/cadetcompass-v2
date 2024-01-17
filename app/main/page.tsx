'use client'
import { signOut } from "next-auth/react";
function MainPage() {
    return ( <div onClick={() => {signOut()}}>
        This is the main page!

    </div> );
}

export default MainPage;
"use client"

import { useSelector } from "react-redux"
import { selectUser } from "@/app/lib/features/userSlice";

const Profile = () => {
  const user = useSelector(selectUser)

  return (
    user &&
    <main>
      <div>
        <p className='text-center'>Signed in succesfully</p>
        <p>{user.email}</p>
        <p>{user.uid}</p>
        {/* <Button type='submit' style="navbar-button mt-5 mx-auto" clickAction={logoutFromApp}>
                    Sign Out
                </Button> */}
      </div>
    </main>
  )
}

export default Profile
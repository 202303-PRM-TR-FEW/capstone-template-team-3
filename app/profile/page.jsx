"use client"

import { useSelector } from "react-redux"
import { selectUser } from "@/app/lib/features/userSlice";

const Profile = () => {
  const user = useSelector(selectUser)
  console.log(user)

  return (
    user &&
    <main>
      <div className="flex flex-col justify-center items-center">
        <p>Signed in succesfully</p>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>ID: {user.uid}</p>
      </div>
    </main>
  )
}

export default Profile
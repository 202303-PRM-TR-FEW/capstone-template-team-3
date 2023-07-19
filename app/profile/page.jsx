"use client"

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase";

const Profile = () => {
  const [user, loading] = useAuthState(auth)

  return (
    user &&
    <main>
      <div className="flex flex-col justify-center items-center">
        <p>Signed in succesfully</p>
        <p>Email: {user.email}</p>
        <p>ID: {user.uid}</p>
      </div>
    </main>
  )
}

export default Profile
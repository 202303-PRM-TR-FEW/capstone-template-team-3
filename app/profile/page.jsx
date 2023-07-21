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
        {user.displayName && <p>Name: {user.displayName}</p>}
        {user.email && <p>Email: {user.email}</p>}
        <p>User ID: {user.uid}</p>
      </div>
    </main>
  )
}

export default Profile
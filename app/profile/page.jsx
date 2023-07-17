"use client"

import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { selectUser } from "@/app/lib/features/userSlice";
import { db, collection, onSnapshot, query, where } from "../firebase/firebase";

const Profile = () => {
  const user = useSelector(selectUser)
  const [userData, setUserData] = useState([])

  // will be replaced if anything more concise is found
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const profileData = { ...querySnapshot.docs[0].data() };
          console.log(profileData)
          setUserData(profileData);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    user &&
    <main>
      <div className="flex flex-col justify-center items-center">
        <p>Signed in succesfully</p>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>ID: {userData.id}</p>
      </div>
    </main>
  )
}

export default Profile
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../lib/features/userSlice";
import {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase/firebase";
import Button from "../components/Button/Button";
import { useRouter } from "next/navigation";

function SignUp() {
  const user = useSelector(selectUser);
  // use state constants for the the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  // A quick check on the name field to make it mandatory
  const register = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords did not match!");
    }

    // Create a new user with Firebase
    createUserWithEmailAndPassword(auth, email, password, name, confirmPassword)
      .then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
          displayName: name,
        })
          .then(
            // Dispatch the user information for persistence in the redux state
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
              })
            )
          )
          .then(() => {
            router.push("/profile");
          })
          .catch((error) => {
            console.log("user not updated");
          });
      })
      .catch((err) => {
        alert(err);
      });
    console.log(email);
  };

  return (
    <div className="flex justify-center mt-20">
      {!user && (
        <div className="login">
          <form className="flex flex-col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="mt-2"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="mt-2"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              className="mt-2"
            />
            <Button
              type="submit"
              style="navbar-button mt-5"
              clickAction={register}
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;

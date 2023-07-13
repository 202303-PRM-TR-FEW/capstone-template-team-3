"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../lib/features/userSlice";
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "../firebase/firebase";
import Button from "../components/Button/Button";
import NavLink from "../components/NavLink/NavLink";
import { useRouter } from "next/navigation";

function SignIn() {
  const user = useSelector(selectUser);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    await loginUser(data)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
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

  const loginUser = async (data) => {
    try {
      const currentUserAuth = await signInWithEmailAndPassword(auth, data.email, data.password)
      dispatch(
        login({
          email: currentUserAuth.user.email,
          uid: currentUserAuth.user.uid,
          displayName: data.name,
        })
      )
      if (currentUserAuth) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {!user && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 w-full xl:w-1/4 mx-auto bg-theme mt-20 rounded-3xl">
            <div className="my-2 mx-auto w-10/12">
              <input {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                placeholder="Email"
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.email ? "true" : "false"}
                type="email" />
              {errors.email?.type === 'required' && <p role="alert" className="text-end text-red-600 italic text-[14px]">Email is required</p>}
              {errors.email?.type === 'pattern' && <p role="alert" className="text-end text-red-600 italic text-[14px]">Email is invalid</p>}
            </div>

            <div className="my-2 mx-auto w-10/12">
              <input {...register("password", { required: true })}
                placeholder="Password"
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.password ? "true" : "false"}
                type="password" />
              {errors.password?.type === 'required' && <p role="alert" className="text-end text-red-600 italic text-[14px]">Password is required</p>}
              {errors.password?.type === 'pattern' && <p role="alert" className="text-end text-red-600 italic text-[14px]">Password is invalid</p>}
            </div>
            <Button
              type="submit"
              style="navbar-button mt-5"
            >
              Sign In
            </Button>
            <p className="pt-5 pb-1 text-center">Not a member? </p>
            <NavLink
              to="/sign-up"
              name={"Sign Up"}
              style="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-5 py-2 text-center flex items-center justify-center h-11"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default SignIn;

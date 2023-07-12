"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
  const { register, formState: { errors }, handleSubmit, watch } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    registerUser(data)
  }

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
  const registerUser = (data) => {
    // e.preventDefault();

    // Create a new user with Firebase
    createUserWithEmailAndPassword(auth, data.email, data.password, data.name)
      .then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
          displayName: data.name,
        })
          .then(
            // Dispatch the user information for persistence in the redux state
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: data.name,
              })
            )
          )
          .then(() => {
            router.push("/profile");
          })
          .catch((err) => {
            console.log("user not updated");
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      {!user && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 w-full xl:w-1/4 mx-auto bg-theme mt-20 rounded-3xl">
            <div className="my-2 mx-auto w-10/12">
              <input {...register("name", { required: true, pattern: /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/ })}
                placeholder="Name"
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.name ? "true" : "false"}
                type="text" />
              {errors.name?.type === 'required' && <p role="alert" className="text-end text-red-600 italic text-[14px]">First name is required</p>}
              {errors.name?.type === 'pattern' && <p role="alert" className="text-end text-red-600 italic text-[14px]">First name is invalid</p>}
            </div>

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

            <div className="my-2 mx-auto w-10/12">
              <input {...register("passwordConfirm", {
                required: true, validate: (value) => {
                  if (watch("password") !== value) {
                    return false;
                  }
                }
              })}
                placeholder="Confirm Password"
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.passwordConfirm ? "true" : "false"}
                type="password" />
              {errors.passwordConfirm?.type === 'required' && <p role="alert" className="text-end text-red-600 italic text-[14px]">Please re-enter password</p>}
              {errors.passwordConfirm?.type === 'validate' && <p role="alert" className="text-end text-red-600 italic text-[14px]">Your passwords do not match</p>}
            </div>

            <div className="my-2 flex justify-between items-center w-10/12 mx-auto">
              <input {...register("checkbox", { required: true })} type="checkbox" aria-invalid={errors.phone ? "true" : "false"} name="checkbox" className="text-lime-600 w-6 h-6 rounded-md ring-0 ring-offset-0 focus:ring-offset-0 focus:ring-0 focus:ring-transparent outline-none focus:outline-none cursor-pointer" />
              <label className="text-center font-medium text-[16px]" htmlFor="checkbox">I accept the <a href="#" className="text-lime-700 italic font-bold">Terms & Conditions</a></label>
            </div>
            {errors.checkbox?.type === 'required' &&
              <div className="my-2 w-10/12 mx-auto">
                <p role="alert" className="text-center text-red-600 italic text-[14px]">You must accept the Terms & Conditions to proceed.</p>
              </div>}
            <Button
              type="submit"
              style="navbar-button mt-5"
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

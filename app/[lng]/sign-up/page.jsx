"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button.jsx";
import NavLink from "../components/NavLink/NavLink";
import { useRouter } from "next/navigation";
import { userSignUpWithEmailAndPassword } from "app/lib/features/userSlice.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useTranslation } from "../../i18n/client";
import { toast } from "react-toastify"

function SignUp({ lng }) {
  const [user, loading] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, "sign-up");
  const error = useSelector((state) => state.user.error)
  const currentUserStatus = useSelector((state) => state.user.status)

  useEffect(() => {
    currentUserStatus === "succeeded" && toast.success("Signed in succesfully.", {
      toastId: "sign-in-succeeded"
    })
    error && error === "Firebase: Error (auth/email-already-in-use)." && toast.error("Email already associated with another account.", {
      toastId: "email-already-in-use"
    })
  }, [currentUserStatus, error])

  const handleRoute = () => {
    router.push(`/profile`);
  };

  const onSubmit = async (data) => {
    const { email, password, name, checkbox } = data;
    dispatch(
      userSignUpWithEmailAndPassword({
        email,
        password,
        name,
        checkbox,
        handleRoute,
      })
    );
  };

  return (
    <div>
      {!user && (
        <div className="container mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 w-11/12 xl:w-2/5 mx-auto bg-theme mt-32 rounded-3xl"
          >
            <div className="my-2 mx-auto w-10/12">
              <input
                {...register("name", {
                  required: true,
                  pattern:
                    /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?:\s[a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
                })}
                placeholder={t("Name")}
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.name ? "true" : "false"}
                type="text"
              />
              {errors.name?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Name is required")}
                </p>
              )}
              {errors.name?.type === "pattern" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Name is invalid")}
                </p>
              )}
            </div>

            <div className="my-2 mx-auto w-10/12">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                placeholder={t("Email")}
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.email ? "true" : "false"}
                type="text"
              />
              {errors.email?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Email is required")}
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Email is invalid")}
                </p>
              )}
            </div>

            <div className="my-2 mx-auto w-10/12">
              <input
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/,
                  minLength: 8,
                })}
                placeholder={t("Password")}
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.password ? "true" : "false"}
                type="password"
              />
              {errors.password?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Password is required")}
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t(
                    "Password must contain a lowercase, an uppercase, and a special character"
                  )}
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Password must be at least 8 characters")}
                </p>
              )}
            </div>

            <div className="my-2 mx-auto w-10/12">
              <input
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return false;
                    }
                  },
                })}
                placeholder={t("Confirm Password")}
                className="bg-accent text-gray-900 rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11"
                aria-invalid={errors.passwordConfirm ? "true" : "false"}
                type="password"
              />
              {errors.passwordConfirm?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Please re-enter password")}
                </p>
              )}
              {errors.passwordConfirm?.type === "validate" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[14px]"
                >
                  {t("Passwords do not match")}
                </p>
              )}
            </div>

            <div className="my-2 flex justify-between items-center w-10/12 mx-auto">
              <input
                {...register("checkbox", { required: true })}
                type="checkbox"
                name="checkbox"
                className="text-lime-600 w-6 h-6 rounded-md ring-0 ring-offset-0 focus:ring-offset-0 focus:ring-0 focus:ring-transparent outline-none focus:outline-none cursor-pointer"
              />
              <label
                className="text-center font-medium text-[16px]"
                htmlFor="checkbox"
              >
                {t("I accept the")}{" "}
                <a href="#" className="text-lime-700 italic font-bold">
                  {t("Terms & Conditions")}
                </a>
              </label>
            </div>
            {errors.checkbox?.type === "required" && (
              <div className="my-2 w-10/12 mx-auto">
                <p
                  role="alert"
                  className="text-center text-red-600 italic text-[14px]"
                >
                  {t("You must accept the Terms & Conditions to proceed.")}
                </p>
              </div>
            )}
            <Button type="submit" style="navbar-button mt-5">
              {t("Sign Up")}
            </Button>
            <p className="pt-5 pb-1 text-center"> {t("Already a member?")}</p>
            <NavLink
              to={`/sign-in`}
              name={t("Sign In")}
              style="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-5 py-2 text-center flex items-center justify-center h-11"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;

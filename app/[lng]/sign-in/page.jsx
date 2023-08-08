"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
import NavLink from "../components/NavLink/NavLink";
import { useRouter } from "next/navigation";
import {
  userSignInWithEmailAndPassword,
  userSignInWithGoogle,
  userSignInWithGithub,
  userSignInWithTwitter,
} from "../../lib/features/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { BsTwitter, BsGithub, BsGoogle } from "react-icons/bs";
import { useTranslation } from "../../i18n/client";
import { toast } from "react-toastify";
import Loader from "../components/Loader/loader";

function SignIn({ params }) {
  const [user, loading] = useAuthState(auth);
  const { lng } = params;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, "sign-in");
  const error = useSelector((state) => state.user.error);
  const currentUserStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    user && currentUserStatus === "succeeded" &&
      toast.success("Signed in succesfully.", {
        toastId: "sign-in-succeeded",
      });
    error &&
      error ===
      "Firebase: Error (auth/account-exists-with-different-credential)." &&
      toast.error("Account exists with different credentials.", {
        toastId: "account-exists-with-different-credential",
      });
    error &&
      error === "Firebase: Error (auth/user-not-found)." &&
      toast.error("Account not found.", {
        toastId: "user-not-found",
      });
    error &&
      error === "Firebase: Error (auth/wrong-password)." &&
      toast.error("Password is wrong.", {
        toastId: "wrong-password",
      });
    error &&
      error ===
      "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." &&
      toast.error(
        "Account has been temporarily disabled due to many failed login attempts. Please try again later.",
        {
          toastId: "too-many-requests",
        }
      );
  }, [currentUserStatus, error, user]);

  const handleRoute = () => {
    router.push(`/${lng}/profile`);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    dispatch(userSignInWithEmailAndPassword({ email, password, handleRoute }));
  };

  const handleGoogleSignIn = async () => {
    dispatch(userSignInWithGoogle({ handleRoute }));
  };

  const handleGithubSignIn = async () => {
    dispatch(userSignInWithGithub({ handleRoute }));
  };

  const handleTwitterSignIn = async () => {
    dispatch(userSignInWithTwitter({ handleRoute }));
  };

  return (
    currentUserStatus === "loading" ? (<Loader />)
      : (
        <div>
          {!user ? (
            <div className="container mx-auto">
              <div className="flex flex-col w-11/12 xl:w-2/5 p-5 mt-10  mx-auto text-center bg-neutral-950 text-white rounded-lg">
                <p>
                  {t("Sign in to kick-off your campaigns or support the others!")}
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-5 w-11/12 xl:w-2/5 mx-auto bg-theme mt-24 rounded-3xl"
              >
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
                    {...register("password", { required: true })}
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
                      {t("Password is invalid")}
                    </p>
                  )}
                </div>
                <Button type="submit" style="navbar-button mt-5">
                  {t("Sign In")}
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    style="navbar-button mt-5 w-1/3"
                    clickAction={handleGoogleSignIn}
                  >
                    <BsGoogle size={30} />
                  </Button>
                  <Button
                    type="button"
                    style="navbar-button mt-5 w-1/3"
                    clickAction={handleTwitterSignIn}
                  >
                    <BsTwitter size={30} />
                  </Button>
                  <Button
                    type="button"
                    style="navbar-button mt-5 w-1/3"
                    clickAction={handleGithubSignIn}
                  >
                    <BsGithub size={30} />
                  </Button>
                </div>
                <p className="pt-5 pb-1 text-center">{t("Not a member?")} </p>
                <NavLink
                  to="/sign-up"
                  name={t("Sign Up")}
                  style="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-5 py-2 text-center flex items-center justify-center h-11"
                />
              </form>
            </div>
          ) : (<Loader />)}
        </div>)
  );
}

export default SignIn;

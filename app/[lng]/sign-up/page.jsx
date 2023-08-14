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
import { toast } from "react-toastify";
import Loader from "../components/Loader/loader.jsx";
import Image from "next/image.js";

function SignUp({ params }) {
  const { lng } = params;
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
  const error = useSelector((state) => state.user.error);
  const currentUserStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    user &&
      currentUserStatus === "succeeded" &&
      toast.success(t("Signed up successfully."), {
        toastId: "sign-up-succeeded",
      });
    error &&
      error === "Firebase: Error (auth/email-already-in-use)." &&
      toast.error(t("Email already associated with another account."), {
        toastId: "email-already-in-use",
      });
  }, [currentUserStatus, error]);

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

  return currentUserStatus === "loading" ? (
    <Loader />
  ) : (
    <div className="container mx-auto object-cover relative">
      <Image
        src={"/assets/images/bgimage.png"}
        alt="bg"
        fill
        className="object-contain z-[-1] opacity-50 absolute"
      />
      {!user ? (
        <div className="container mx-auto ">
          <div className="flex flex-col p-5 w-fit mx-auto text-center bg-accent text-accent rounded-3xl h-[94px] mt-10 z-0"></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 mx-auto w-11/12 md:w-3/4 lg:w-8/12 xl:w-2/5 bg-theme rounded-3xl"
          >
            <div className="my-2 mx-auto w-full md:w-10/12">
              <input
                {...register("name", {
                  required: true,
                  pattern:
                    /^[a-zA-Z]+(?:-[a-zA-Z]+)*(?:\s[a-zA-Z]+(?:-[a-zA-Z]+)*)*$/,
                })}
                placeholder={t("Name")}
                className="bg-accent text-accent-black rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11 text-xs md:text-base"
                aria-invalid={errors.name ? "true" : "false"}
                type="text"
                data-cy="name-input"
              />
              {errors.name?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("Name is required")}
                </p>
              )}
              {errors.name?.type === "pattern" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("Name is invalid")}
                </p>
              )}
            </div>

            <div className="my-2 mx-auto w-full md:w-10/12">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                placeholder={t("Email")}
                className="bg-accent text-accent-black rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11 text-xs md:text-base"
                aria-invalid={errors.email ? "true" : "false"}
                type="text"
                data-cy="email-input"
              />
              {errors.email?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px] "
                >
                  {t("Email is required")}
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("Email is invalid")}
                </p>
              )}
            </div>

            <div className="my-2 mx-auto w-full md:w-10/12">
              <input
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/,
                  minLength: 8,
                })}
                placeholder={t("Password")}
                className="bg-accent text-accent-black rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11 text-xs md:text-base"
                aria-invalid={errors.password ? "true" : "false"}
                type="password"
                data-cy="password-input"
              />
              {errors.password?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px] "
                >
                  {t("Password is required")}
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t(
                    "Password must contain a lowercase, an uppercase, and a special character"
                  )}
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("Password must be at least 8 characters")}
                </p>
              )}
            </div>

            <div className="my-2 mx-auto w-full md:w-10/12">
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
                className="bg-accent text-accent-black rounded-lg focus:ring-0 w-full p-2.5 border-0 h-11 text-xs md:text-base"
                aria-invalid={errors.passwordConfirm ? "true" : "false"}
                type="password"
                data-cy="passwordConfirm-input"
              />
              {errors.passwordConfirm?.type === "required" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("Please re-enter password")}
                </p>
              )}
              {errors.passwordConfirm?.type === "validate" && (
                <p
                  role="alert"
                  className="text-end text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("Passwords do not match")}
                </p>
              )}
            </div>

            <div className="my-3 flex justify-normal items-center w-10/12 mt-0.5 md:mx-auto whitespace-nowrap">
              <input
                {...register("checkbox", { required: true })}
                type="checkbox"
                name="checkbox"
                className="text-[#050708]/30 w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-sm md:rounded-md ring-0 ring-offset-0 focus:ring-offset-0 focus:ring-0 focus:ring-transparent outline-none focus:outline-none cursor-pointer"
              />
              <label
                className="font-medium text-[11px] md:text-base ml-2"
                htmlFor="checkbox"
              >
                {t("I accept the")}{" "}
                <a
                  href="#"
                  className="text-[#050708]/50 hover:text-[#050708]/80 italic font-bold text-[11px] md:text-base"
                >
                  {t("Terms & Conditions")}.
                </a>
              </label>
            </div>
            {errors.checkbox?.type === "required" && (
              <div className="my-2 -mt-2 w-64 md:w-full">
                <p
                  role="alert"
                  className="text-center text-red-600 italic text-[10px] md:text-[12px]"
                >
                  {t("You must accept the Terms & Conditions to proceed.")}
                </p>
              </div>
            )}
            <Button
              type="submit"
              style="navbar-button mt-2 md:mt-3 w-full text-sm md:text-base lg:text-[18px] mx-auto"
            >
              {t("Sign Up")}
            </Button>
            <p className="pt-5 pb-1 mb-1 text-center text-sm md:text-[18px]">
              {" "}
              {t("Already a member?")}
            </p>
            <NavLink
              to={`/${lng}/sign-in`}
              name={t("Sign In")}
              style="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg px-5 py-2 text-center flex items-center justify-center h-11 w-full text-sm md:text-base lg:text-[18px] mx-auto"
            />
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SignUp;

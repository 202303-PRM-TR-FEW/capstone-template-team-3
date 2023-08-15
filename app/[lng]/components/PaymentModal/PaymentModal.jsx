"use client";

import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "./PaymentModal.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/app/lib/features/paymentModalSlice";
import { auth } from "../../../firebase/firebase";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "@/app/lib/features/userSlice";
import { addUserDonation } from "@/app/lib/features/campaignSlice";
import { getCurrentCampaign } from "@/app/lib/features/campaignSlice";
import { useTranslation } from "../../../i18n/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"

const PaymentModal = ({ campaignId, lng }) => {
  const [user, loading] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, "paymentModal");
  const router = useRouter();

  const currentUser = useSelector((state) => state.user.user);

  const handleModalToggle = () => {
    dispatch(closeModal());
  };

  const getCurrentUserData = async () => {
    await dispatch(getUserData(user.uid));
  };

  useEffect(() => {
    if (!loading) {
      getCurrentUserData();
    }
  }, [loading]);

  const onSubmit = async (data) => {
    const { donation, checkbox } = data;
    const currentUserId = currentUser.id;
    await dispatch(
      addUserDonation({ currentUserId, donation, checkbox, campaignId })
    );
    await dispatch(getCurrentCampaign(campaignId));
    await dispatch(closeModal());
    await router.push("/thank-you");
    toast.success(t("Payment successful."), {
      toastId: "payment-succeeded"
    })
  };

  return (
    <main>
      <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-50 modal-background z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-50 2xl:w-[40%] rounded-xl p-4 flex flex-col justify-between w-11/12 sm:w-[60%] lg:w-[72%] xl:w-[60%] h-[50%]"
        >
          <div>
            <div>
              <Button type="button" clickAction={handleModalToggle}>
                <IoIosArrowBack size={28} />
              </Button>
            </div>
            <div className="lg:m-2 lg:my-4 lg:text-[38px] md:text-[20px] md:m-2 text-[20px] leading-tight">
              {t("Enter the donation amount")}:
            </div>
            <div className="flex flex-col md:flex-row justify-between md:m-2 my-2">
              <input
                {...register("donation", {
                  required: true,
                  pattern: /^[1-9][0-9]*$/,
                })}
                placeholder="$0"
                className="bg-slate-50 text-black text-[30px] w-full focus:outline-none focus:ring-0 custom-border-bottom border-x-0 border-t-0 border-b-[1px] border-solid border-black"
              />
            </div>
            {errors.donation?.type === "required" && (
              <p
                role="alert"
                className="text-end text-red-600 italic text-[14px] md:m-2"
              >
                {t("Donation is required")}
              </p>
            )}
            {errors.donation?.type === "pattern" && (
              <p
                role="alert"
                className="text-end text-red-600 italic text-[14px] md:m-2"
              >
                {t("Donation is invalid")}
              </p>
            )}
            <div className="flex items-center md:m-2">
              <label className="text-[18px]">{t("Add 2% for charity")}</label>
              <input
                {...register("checkbox")}
                type="checkbox"
                name="checkbox"
                className="ml-2 charity-checkbox text-theme"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10 md:mt-auto">
            <Button
              type="submit"
              style="bg-zinc-950 rounded-md w-full p-2 text-white text-[15px]"
            >
              {t("Pay now")}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PaymentModal;

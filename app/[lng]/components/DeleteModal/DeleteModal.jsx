"use client";

import "react-datepicker/dist/react-datepicker.css";
import "./DeleteModal.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../../i18n/client";
import { deleteCurrentCampaign } from "@/app/lib/features/campaignSlice";
import { toast } from "react-toastify"


const DeleteModal = ({ lng, campaignId, setDeleteModalIsOpen }) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { t } = useTranslation(lng, "deleteModal");
    const currentCampaign = useSelector((state) => state.campaign.currentCampaign)

    const handleCloseModal = () => {
        setDeleteModalIsOpen(false)
    }

    const handleDeleteCampaign = async () => {
        await dispatch(deleteCurrentCampaign({ campaignId }))
        setDeleteModalIsOpen(false)
        await router.push("/my-campaigns")
        toast.success("Campaign deleted succesfully.", {
            toastId: "delete-succeeded"
        })
    }

    return (currentCampaign &&
        <main>
            <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-50 modal-background z-10">
                <div className="bg-slate-50 lg:w-[50%] lg:h-[auto] rounded-xl p-4 flex flex-col justify-between sm:w-[75%] sm:h-[75%]">
                    <h3 className="text-center text-[30px] p-5">{t("Are you sure you want to cancel and delete this campaign?")}</h3>
                    <div className="flex justify-center items-center gap-5">
                        <Button name={t("Yes, cancel and delete the campaign")} style={"bg-red-600 text-white py-3 px-8 rounded-lg"} clickAction={handleDeleteCampaign} />
                        <Button name={t("No, back to the campaign")} style={"bg-neutral-950 text-white py-3 px-8 rounded-lg"} clickAction={handleCloseModal} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DeleteModal;

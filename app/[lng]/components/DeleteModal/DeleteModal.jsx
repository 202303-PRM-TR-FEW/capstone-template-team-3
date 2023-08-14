"use client";

import "react-datepicker/dist/react-datepicker.css";
import "./DeleteModal.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../../i18n/client";
import { deleteCurrentCampaign } from "@/app/lib/features/campaignSlice";
import { toast } from "react-toastify"
import Loader from "../Loader/loader";

const DeleteModal = ({ params, campaignId, setDeleteModalIsOpen }) => {
    const { lng } = params;
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
        toast.success(t("Campaign deleted."), {
            toastId: "delete-succeeded"
        })
    }

    return (
        currentCampaign ? (<main>
            <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-50 modal-background z-10">
                <div className="bg-slate-50 xl:w-[75%] 2xl:w-[60%] rounded-xl p-4 flex flex-col justify-between w-11/12 sm:w-[80%]">
                    <h3 className="text-center text-base md:text-[22px] py-5 px-2">{t("Are you sure you want to cancel and delete this campaign?")}</h3>
                    <div className="flex flex-col justify-stretch w-10/12 mx-auto gap-5">
                        <Button name={t("Yes, cancel and delete the campaign")} style={"bg-red-600 text-sm md:text-[18px] text-white py-3 px-3 rounded-lg"} clickAction={handleDeleteCampaign} />
                        <Button name={t("No, back to the campaign")} style={"bg-neutral-950 text-sm md:text-[18px] text-white py-3 px-3 rounded-lg"} clickAction={handleCloseModal} />
                    </div>
                </div>
            </div>
        </main>) : (<Loader />)
    );
};

export default DeleteModal;

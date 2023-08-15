"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignOwnerProfileData } from "@/app/lib/features/userSlice";
import { getAllOwnerCampaigns, getAllOwnerDonations } from "@/app/lib/features/campaignSlice";
import Loader from "@/app/[lng]/components/Loader/loader";

const CampaignOwnerProfile = ({ params }) => {
    const { campaignId, lng, campaignOwnerId } = params;
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(lng, "campaignId");
    const campaignOwner = useSelector((state) => state.user.campaignOwnerProfileData)
    const ownerCampaigns = useSelector((state) => state.campaign.ownerCampaigns)
    const ownerDonations = useSelector((state) => state.campaign.ownerDonations)
    const userStatus = useSelector((state) => state.user.status)
    const campaignStatus = useSelector((state) => state.campaign.status);

    const getCampaignOwnerData = async () => {
        await dispatch(getCampaignOwnerProfileData(campaignOwnerId))
    }

    const getCampaignOwnerCampaigns = async () => {
        await dispatch(getAllOwnerCampaigns(campaignOwnerId))
    }

    const getCampaignOwnerDonations = async () => {
        await dispatch(getAllOwnerDonations(campaignOwnerId))
    }

    const handleRoute = () => {
        router.push(`/${lng}/campaigns/${campaignId}/${campaignOwnerId}/${campaignOwner.name}`)
    }

    useEffect(() => {
        getCampaignOwnerData()
        getCampaignOwnerCampaigns()
        getCampaignOwnerDonations()
    }, [])

    return (
        userStatus === "loading" || campaignStatus === "loading" ? (<Loader />) : (
            campaignOwner &&
            <main>
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg my-10">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="mt-10 mb-10 relative">
                                        <img
                                            alt="..."
                                            src={`${campaignOwner.photo
                                                ? campaignOwner.photo
                                                : "/assets/images/empty-user.png"
                                                }`}
                                            className="bg-theme shadow-xl rounded-full h-40 w-40 align-middle border-4 border-theme"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                                    {campaignOwner.name}
                                </h3>
                            </div>
                            <div className="flex justify-center w-full px-4 text-center border-t border-blueGray-200 mt-10 py-10">
                                <div className="lg:w-1/3 mx-auto flex flex-col justify-center items-center">
                                    <h2>{t("Campaigns")}</h2>
                                    <div className="flex flex-col justify-center py-4 lg:pt-4 md:flex-row">
                                        <div
                                            className="p-3 h-[5rem] w-52 lg:w-36 my-2 text-center bg-theme rounded-lg hover:bg-accent-black hover:text-theme cursor-pointer md:mr-2 md:my-0"
                                            onClick={handleRoute}
                                        >
                                            <span className="text-xl font-bold block uppercase tracking-wide">
                                                {ownerCampaigns.length}
                                            </span>
                                            <span className="text-sm">
                                                {t("Kicked-Off")}
                                            </span>
                                        </div>
                                        <div
                                            className="p-3 h-[5rem] w-52 lg:w-36 my-2 text-center bg-theme rounded-lg hover:bg-accent-black hover:text-theme cursor-pointer md:ml-2 md:my-0"
                                            onClick={handleRoute}
                                        >
                                            <span className="text-xl font-bold block uppercase tracking-wide">
                                                {ownerDonations.length}
                                            </span>
                                            <span className="text-sm">
                                                {t("Supported")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    )
}

export default CampaignOwnerProfile
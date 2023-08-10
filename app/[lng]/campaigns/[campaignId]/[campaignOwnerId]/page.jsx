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
                                {/* <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div> */}
                            </div>
                            <div className="flex justify-center w-full px-4 text-center border-t border-blueGray-200 mt-10 py-10">
                                <div className="mx-auto md:w-1/3">
                                    <h2>{t("Campaigns")}</h2>
                                    <div className="flex flex-col justify-center py-4 lg:pt-4 pt-8 md:flex-row">
                                        <div
                                            className="my-2 p-3 h-22 text-center bg-theme rounded-lg hover:bg-accent-black hover:text-theme cursor-pointer md:mr-2"
                                            onClick={handleRoute}
                                        >
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {ownerCampaigns.length}
                                            </span>
                                            <span className="text-sm text-blueGray-400">
                                                {t("Kicked-Off")}
                                            </span>
                                        </div>
                                        <div
                                            className="my-2 p-3 h-22 text-center bg-theme rounded-lg hover:bg-accent-black hover:text-theme cursor-pointer md:ml-2"
                                            onClick={handleRoute}
                                        >
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {ownerDonations.length}
                                            </span>
                                            <span className="text-sm text-blueGray-400">
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
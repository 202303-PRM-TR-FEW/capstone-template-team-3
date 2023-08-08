"use client";

import "./navigation.css";
import Image from "next/image";
import navigationBanner from "public/assets/images/navigation-banner.png";
import Button from "../components/Button/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../i18n/client";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/lib/features/kickOffModalSlice.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { getUserData, userJoinNewsletter } from "@/app/lib/features/userSlice";
import { BsPatchCheckFill } from "react-icons/bs"
import { toast } from "react-toastify"

export default function Navigation({ lng }) {
  const [user, loading] = useAuthState(auth);
  const [supportIsChecked, setSupportIsChecked] = useState(false);
  const [kickoffIsChecked, setKickoffIsChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, "navigation");
  const currentUser = useSelector((state) => state.user.user);

  const handleSupportCheck = () => {
    setSupportIsChecked(!supportIsChecked);
  };

  const handleKickoffCheck = () => {
    setKickoffIsChecked(!kickoffIsChecked);
  };

  const handleNewsletter = async () => {
    if (user && !loading) {
      const userId = user.uid
      await dispatch(userJoinNewsletter(userId))
      await dispatch(getUserData(userId))
      toast.success("Joined newsletter succesfully.", {
        toastId: "navigation-newsletter-join-succeeded"
      })
    } else {
      router.push("/sign-in")
    }
  }

  useEffect(() => {
    if (user && !loading) {
      const userId = user.uid
      dispatch(getUserData(userId))
    }
  }, [user, loading])

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (supportIsChecked) {
        router.push("/campaigns");
      }
      if (kickoffIsChecked) {
        router.push("/my-campaigns");
        dispatch(openModal());
      }
      if (kickoffIsChecked && !user) {
        router.push("/sign-in");
      }
    }, 1000);
    return () => clearTimeout(redirectTimeout);
  }, [supportIsChecked, kickoffIsChecked]);

  return (
    <main className="navigation-main">
      <section className="checkbox-section">
        <p className="checkbox-option-paragraph-text">{t("I-want-to")}:</p>
        <div className="checkbox-support-container">
          <input
            type="checkbox"
            name="support"
            id="support"
            className="checkbox-input"
            onChange={handleSupportCheck}
            checked={supportIsChecked}
            disabled={kickoffIsChecked}
          />
          <div className="checkbox-text-container">
            <h2 className="checkbox-header-text">{t("Support")}</h2>
            <span className="checkbox-appendix-text">
              {t("other-campaigns")}
            </span>
          </div>
        </div>
        <hr className="navigation-divider" />
        <div className="checkbox-kick-off-container">
          <input
            type="checkbox"
            name="kick-off"
            id="kick-off"
            className="checkbox-input"
            checked={kickoffIsChecked}
            disabled={supportIsChecked}
            onChange={handleKickoffCheck}
          />
          <div className="checkbox-text-container">
            <h2 className="checkbox-header-text">{t("Kick-off")}</h2>
            <span className="checkbox-appendix-text">{t("my-campaign")}</span>
          </div>
        </div>
      </section>
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-banner-container">
            <Image
              src={navigationBanner}
              alt="Illustration of a hand holding green hearts near books."
              className="newsletter-banner"
              priority={true}
            />
          </div>
          <article className="newsletter-text-container">
            <h3 className="newsletter-header-text">{t("Stay informed")}</h3>
            <p className="newsletter-paragraph-text">
              {t("newsletter-paragraph-text-first")}
              {t("newsletter-paragraph-text-second")}
            </p>
          </article>
          {currentUser && currentUser.joinedNewsletter ?
            <BsPatchCheckFill size={50} className="text-theme my-10" />
            : <Button
              type={"button"}
              style="newsletter-button"
              name={t("Join newsletter")}
              clickAction={handleNewsletter}
            />}
        </div>
      </section>
    </main>
  );
}
